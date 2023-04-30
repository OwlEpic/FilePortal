import { w3cwebsocket as W3CWebSocket } from 'websocket'
var client;
var curBlob = new Blob([""])
var tempType = "";
var curType = "";
var code = ""
var ty = -1
var name = ""
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
      document.getElementById("inpt").defaultValue = code;
    console.log('WebSocket Client Connected')
  }

  client.onclose = function() {
    console.log('WebSocket Client Closed')
  }
  client.onmessage = function(e) {
    if(typeof(e.data) === "string" && e.data.substring(0, 4) === "FILE") {
        var per = e.data.lastIndexOf(".");
        name = e.data.substring(4, per)
        tempType = e.data.substring(per+1).toLowerCase();
        console.log("data:" + e.data + " name: " + name + " temp:" + tempType)
        if(tempType === "jpg" || tempType === "jpeg" || tempType === "png") {
            curType = 'image/' + tempType
        } else if (tempType === "zip" || tempType === "pdf" || tempType === "json") {
            curType = 'application/' + tempType
        }
    }
    else if(e.data.size === 1000000) {
        curBlob = new Blob([curBlob, e.data], {type: curType})
    } else {
        curBlob = new Blob([curBlob, e.data], {type: curType})
        console.log("type: " + curType)
        document.getElementById("link").href = URL.createObjectURL(curBlob);
        document.getElementById("link").setAttribute("download", name);
        document.getElementById('link').click();
        console.log('Received:', e.data)
        curBlob = new Blob([""])
    }
    
    
  }
}

export function sendData(val) {
    client.send(val);
}
