import { React, useState, useRef } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { connect, sendData } from '../Sockt.js';

const Single = () => {
  var [client, setClient] = useState();
  
  const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];

  var fa;
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
      sendData(reader.result)
      chunk++;
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
  const [col, setCol] = useState("white")

  const handleClick = () => {
    var val = inputRef.current.value
    
    setButtonText('Button clicked!');
    if(col=="white"){
      setCol("orange")
    }
    console.log(col)
    setTimeout(() => setButtonText('Click me'), 2000);
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
              <div class="portal-frame" style={{color: col }}>
                <div class="portal" style={{background: col }}></div>
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