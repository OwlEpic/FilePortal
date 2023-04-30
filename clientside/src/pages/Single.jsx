import { React, useState, useEffect } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { connect, sendData } from '../Sockt.js';

const Single = () => {
  var [client, setClient] = useState();
  
  const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];

  var [fil, setFile] = useState(null);
  var [fa, setFa] = useState();
  var chunk = 0;
  const reader = new FileReader()
  var start = 0;
  const chunkSize = 65536;

  
  
  
  const handleChangeFile = (file) => {
    setFile(fil=file);
  };

  const sendFile = () => {
    getChunk(fil, start)
    var numberofChunks = Math.ceil(fil.size/chunkSize);
    reader.onloadend = (event) => {
      setFa(fa=reader.result)
      console.log("sent 1 part of size")
      sendData(fa)
      chunk++;
      console.log("SET CHUNK %d", chunk)
      if(chunk < numberofChunks) {
        start += chunkSize
        getChunk(fil, start)
      }
      //console.log(fa)
    };
  }

  function getChunk(file, starting) {
    var end = Math.min(starting + chunkSize , file.size);
    var slice = file.slice(starting, end);
    reader.readAsArrayBuffer(slice);
    
    
    //console.log("on chunk %d out of %d", curChunk, numberofChunks)

    
  }

  const [input, setInput] = useState("")

  const [codes, setCodes] = useState({
    code:"waiting for code",
  })

  const handleChange = (e) => {
    setCodes((prev)=>({...prev, code: input}))
  }

  const getFile = (e) => {
    
  }

  

  return (
    <div className="single">
      <h1> sample </h1>
      <input onChange={e=>setInput(e.target.value)} placeholder="waiting on code..." />
      <button onClick={handleChange}> refresh </button>
      <span>code is {codes.code}</span>
      <FileUploader handleChange={handleChangeFile} name="file" types={fileTypes} />

      <a id="link" href="#" download>Download</a>
      <button onClick={getFile}>Testing</button>
      <button onClick={connect}>Register</button>
      <button onClick={sendFile}>Send</button>
    </div>
  )
}

export default Single