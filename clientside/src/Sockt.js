import { w3cwebsocket as W3CWebSocket } from 'websocket'
var client;
var curBlob = new Blob([""])
var curType = "";
var code = ""
var ty = -1
export function connect (cod, type) {
    code = cod
    ty = type 
    client = new W3CWebSocket("ws://35.182.117.165:7415",)

   


  client.onerror = function() {
    console.log('Connection Error')
  }

  client.onopen = function() {
      if(ty === 1) {
            sendData("SBEG" + code)
      } else if (ty === 0) {
          sendData("CODE" + code)
      }
    console.log('WebSocket Client Connected')
  }

  client.onclose = function() {
    console.log('WebSocket Client Closed')
  }
  client.onmessage = function(e) {
    if(e.data.size === 65536) {
        curBlob = new Blob([curBlob, e.data], {type: "image/jpg"})
    } else {
        curBlob = new Blob([curBlob, e.data], {type: "image/jpg"})
        document.getElementById("link").href = URL.createObjectURL(curBlob);
        document.getElementById('link').click();
        console.log('Received:', e.data)
    }
    
    
  }
}

export function sendData(val) {
    client.send(val);
}
