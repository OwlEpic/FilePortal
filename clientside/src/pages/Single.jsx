import { React, useState, useRef } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { connect, sendData } from '../Sockt.js';

const Single = () => {
  var [client, setClient] = useState();
  
  const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];

  const [fa, setFa] = useState();
  var chunk = 0;
  const reader = new FileReader()
  var start = 0;
  const chunkSize = 65536;

  
  
  
  const handleChangeFile = (file) => {
    sendData("FILE" + file.name)
    sendFile(file);
  };

  const sendFile = (fil) => {
    getChunk(fil, start)
    var numberofChunks = Math.ceil(fil.size/chunkSize);
    reader.onloadend = (event) => {
      setFa(reader.result)
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

  const textAreaRef = useRef(null);

  const [input, setInput] = useState("")

  const [codes, setCodes] = useState({
    empt:"",
    code:"waiting for code",
  })

  const handleChange = (e) => {
    setCodes((prev)=>({...prev, code: input}))
  }



  const inputRef = useRef();
  const [updated, setUpdated] = useState("");
  const [buttonText, setButtonText] = useState('Click me');

  const handleClick = () => {
    var val = inputRef.current.value
    
    setButtonText('Button clicked!');
    setTimeout(() => setButtonText('Click me'), 1500);
    if(val) {
      connect(val, 1)
    } else {
      console.log("trying to connect")
      const cod = Math.floor(100000 + Math.random() * 900000);
      connect(cod, 0);
    }
  }

  return (
    <div className="single">
      <div className="cont">
        <div className="wrap">
          <p>Copy and send your code to the person you want to share with!</p>
          <input id="inpt" ref={inputRef} placeholder="waiting on code"  />
          <button className="button" onClick={handleClick}>
            {buttonText}
          </button>
          <div className="filedrop">
              <FileUploader handleChange={handleChangeFile} name="file" types={fileTypes}>
              <div class="portal-frame">
                <div class="portal"></div>
              </div>
              </FileUploader>
          </div>
          <a id="link" href="#" download>Download</a>
        </div>
      </div>
    </div>
  )
}

export default Single