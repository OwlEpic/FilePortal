import { w3cwebsocket as W3CWebSocket } from 'websocket'
var client;
var curBlob = new Blob([""])
export function connect () {
    client = new W3CWebSocket("ws://15.222.13.55:7415",)

   


  client.onerror = function() {
    console.log('Connection Error')
  }

  client.onopen = function() {
    console.log('WebSocket Client Connected')
  }

  client.onclose = function() {
    console.log('WebSocket Client Closed')
  }
  client.onmessage = function(e) {
    if(e.data.size !== 65536) {
        curBlob = new Blob(curBlob, [e.data])
    } else {
        document.getElementById("link").href = URL.createObjectURL(curBlob);
        document.getElementById('link').click();
        console.log('Received:', e.data)
    }
    
    
  }
}

export function sendData(val) {
    client.send(val);
}
