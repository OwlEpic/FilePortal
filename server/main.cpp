#include <cstdio>
#include <iostream>
#include <ixwebsocket/IXNetSystem.h>
#include <ixwebsocket/IXWebSocketMessageType.h>
#include <ixwebsocket/IXWebSocketServer.h>
#include <sstream>
#include <string>
#include <unordered_map>

template <typename... Args>
std::string fmt(const Args&... args)
{
    std::stringstream s;
    (s << ... << args);
    return s.str();
}

class Client
{
private:
    static std::unordered_map<std::string, Client*> _registry;
    static std::unordered_map<std::string, Client> _clients;

    std::string _code;
    std::string _id;
    ix::WebSocket& _ws; // the websocket of this client
    Client* _peer = nullptr; // client we are currently in a session with

public:
    Client(const std::string& id, ix::WebSocket& ws) : _id(id), _ws(ws)
    {}

    static void new_client(const std::string& id, ix::WebSocket& ws)
    {
        _clients.emplace(id, Client(id, ws));
    }

    static Client* get(const std::string& id)
    {
        auto it = _clients.find(id);
        if (it != _clients.end())
            return &it->second;
        return nullptr;
    }

    void end_session()
    {
        if (_peer == nullptr)
            return;
        _peer->_peer = nullptr;
        _peer = nullptr;
    }

    void end()
    {
        end_session();
        _clients.erase(_id);
    }

    void close()
    {
        _ws.close();
    }

    bool send(const std::string& message, bool binary = false)
    {
        if (!_ws.send(message, binary).success)
        {
            _ws.close();
            end();
            return false;
        }
        return true;
    }

    bool send_to_peer(const std::string& message, bool binary = false)
    {
        if (_peer == nullptr)
        {
            std::cout << "benis\n";
            return false;
        }
        return _peer->send(message, binary);
    }

    void handle_request(const std::string& str)
    {
        std::cout << "request: " << _id << ": " << str << '\n';
        if (str.size() < 4)
            return;

        std::string command = str.substr(0, 4);
        if (command == "SBEG")
        {
            if (_peer != nullptr)
                return;
            else if (auto it = _registry.find(str.substr(4)); it != _registry.end())
            {
                _peer = it->second;
                if (_peer->_peer != nullptr)
                    return;
                _peer->_peer = this;
            }
        }
        else if (command == "SEND")
        {
            if (_peer == nullptr)
                return;
            _peer->_peer = nullptr;
            _peer = nullptr;
        }
        else if (command == "CODE")
        {
            if (_code.size() != 0)
            {
                _ws.close();
                end();
            }
            else
            {
                _code = str.substr(4);
                _registry.emplace(_code, this);
            }
        }
        else if (command == "FILE")
        {
            if (!send_to_peer(str, false))
            {
                end();
                close();
            }
        }
    }
};

std::unordered_map<std::string, Client*> Client::_registry {};
std::unordered_map<std::string, Client> Client::_clients {};

int main()
{
    ix::WebSocketServer endpoint(7415, "0.0.0.0");
    endpoint.setOnClientMessageCallback([&] (std::shared_ptr<ix::ConnectionState> con, ix::WebSocket& ws, const ix::WebSocketMessagePtr& msg)
    {
        if (msg->type == ix::WebSocketMessageType::Open)
        {
            std::cout << "new client: " << con->getId() << '\n';
            Client::new_client(con->getId(), ws);
        }
        else if (msg->type == ix::WebSocketMessageType::Close)
        {
            std::cout << "client gone: " << con->getId() << '\n';
            Client* client = Client::get(con->getId());
            if (client == nullptr)
                return;
            client->end();
        }
        else if (msg->type == ix::WebSocketMessageType::Message)
        {
            Client* client = Client::get(con->getId());
            if (client == nullptr)
                return;
            if (msg->binary)
            {
                std::cout << "client " << con->getId() << " sending " << msg->str.size() << " bytes to peer.\n";
                if (!client->send_to_peer(msg->str, true))
                {
                    client->end();
                    client->close();
                }
            }
            else
            {
                client->handle_request(msg->str);
            }
        }
    });

    endpoint.listen();
    endpoint.disablePerMessageDeflate();
    endpoint.start();
    endpoint.wait();
}