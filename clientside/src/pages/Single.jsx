import { React, useState } from 'react'
import { FileUploader } from "react-drag-drop-files";



// const client = net.createConnection(serverAddress, () => {
//   console.log('Connected to server!');
// });


const Single = () => {
  // const NetcatClient = require('netcat/client')
  // const nc2 = new NetcatClient()
  // nc2.addr('35.183.178.249').port(7415).connect()

  // client.on('data', (data) => {
  //   console.log("GOT DATA %s", data.toString())
  // })

  var na = require('node:net');
  var serverAddress = {
    host: '35.183.178.249',
    port: 7415
  };
  var client = na.connect({ port: 7415, host:'35.183.178.249' }, () => {
    console.log("conected")
  })
  

  const fileTypes = ["JPG", "PNG", "GIF"];

  const [file, setFile] = useState(null);
  const [fa, setFa] = useState();
  var chunk = 0;
  const reader = new FileReader()
  var start = 0;
  const chunkSize = 65536;
  
  
  const handleChangeFile = (file) => {
    setFile(file);
    getChunk(file, start)
    var numberofChunks = Math.ceil(file.size/chunkSize);
    //fr.readAsArrayBuffer(slice);
    //reader.readAsArrayBuffer(file)
    reader.onloadend = (event) => {
      setFa(prev=>prev= reader.result)
      sendData()
      chunk++;
      console.log("SET CHUNK %d", chunk)
      if(chunk < numberofChunks) {
        getChunk(file, start)
      }
      //console.log(fa)
    };
  };

  function getChunk(file, starting) {
    var end = Math.min(starting + chunkSize , file.size);
    var slice = file.slice(starting, end);
    reader.readAsArrayBuffer(slice);
    start = end
    
    //console.log("on chunk %d out of %d", curChunk, numberofChunks)

    
  }

  const [input, setInput] = useState("")

  const [codes, setCodes] = useState({
    code:"waiting for code",
  })

  const handleChange = (e) => {
    setCodes((prev)=>({...prev, code: input}))
  }

  const sendFile = (e) => {
    const bleb = new Blob([fa])
    document.getElementById("link").href = URL.createObjectURL(bleb);
    document.getElementById('link').click();
  }

  const sendData = () => {
    
  }

  return (
    <div className="single">
      <h1> sample </h1>
      <input onChange={e=>setInput(e.target.value)} placeholder="waiting on code..." />
      <button onClick={handleChange}> refresh </button>
      <span>code is {codes.code}</span>
      <FileUploader handleChange={handleChangeFile} name="file" types={fileTypes} />

      <a id="link" href="#" download>Download</a>
      <button onClick={sendFile}>Testing</button>
    </div>
  )
}

export default Single