#include <array>
#include <arpa/inet.h>
#include <cstdio>
#include <cstdlib>
#include <fcntl.h>
#include <netinet/in.h>
#include <string>
#include <sys/epoll.h>
#include <sys/ioctl.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <unistd.h>
#include <unordered_map>
#include <vector>

struct Client
{
private:
    size_t _recv_idx;
    std::array<char, 65536> _buffer;

public:
    std::string code;
    int fd;
    int otherfd;
    
    void receive()
    {
        
    }

    Client(int fd) : fd(fd), otherfd(-1), _recv_idx(0)
    {}
};

void process(int sockfd)
{
    const size_t MAX_EVENTS = 1024;

    std::vector<Client> clients;
    std::unordered_map<std::string, Client*> registry;

    int epfd = epoll_create1(0);
    if (epfd < 0)
    {
        perror("epoll_create1");
        exit(EXIT_FAILURE);
    }

    epoll_event ev;
    epoll_event events[MAX_EVENTS];

    ev.events = EPOLLIN;
    ev.data.ptr = nullptr;
    if (epoll_ctl(epfd, EPOLL_CTL_ADD, sockfd, &ev) < 0)
    {
        perror("epoll_ctl(epfd, EPOLL_CTL_ADD, sockfd, &ev)");
        exit(EXIT_FAILURE);
    }

    while (1)
    {
        int nevents = epoll_wait(epfd, events, MAX_EVENTS, -1);
        if (nevents < 0)
        {
            perror("epoll_wait(epfd, events, MAX_EVENTS, -1)");
            exit(EXIT_FAILURE);
        }

        for (int i = 0; i < nevents; ++i)
        {
            if (events[i].data.ptr == NULL)
            {
                int clientfd = accept(sockfd, NULL, NULL);
                if (clientfd < 0)
                {
                    perror("accept(sockfd, NULL, NULL)");
                    exit(EXIT_FAILURE);
                }
                clients.emplace_back(clientfd);
                ev.events = EPOLLIN;
                ev.data.ptr = &clients.back();
                if (epoll_ctl(epfd, EPOLL_CTL_ADD, clientfd, &ev) < 0)
                {
                    perror("epoll_ctl(epfd, EPOLL_CTL_ADD, clientfd, &ev)");
                    exit(EXIT_FAILURE);
                }
                printf("%d connected\n", clientfd);
            }
            else
            {
                Client& client = *reinterpret_cast<Client*>(events[i].data.ptr);
                int avail;
                if (ioctl(client.fd, FIONREAD, &avail) < 0)
                {
                    perror("ioctl(client.fd, FIONREAD, &avail)");
                    exit(EXIT_FAILURE);
                }
            }
        }
    }
}

int main()
{
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0)
    {
        perror("socket");
        exit(EXIT_FAILURE);
    }

    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(7415);

    if (bind(sockfd, (struct sockaddr*)&addr, sizeof(addr)) < 0)
    {
        perror("bind");
        exit(EXIT_FAILURE);
    }

    if (listen(sockfd, 1024) < 0)
    {
        perror("listen");
        exit(EXIT_FAILURE);
    }

    process(sockfd);
}