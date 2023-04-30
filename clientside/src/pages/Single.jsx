import { React, useState, useRef } from 'react'
import { FileUploader } from "react-drag-drop-files";



// const client = net.createConnection(serverAddress, () => {
//   console.log('Connected to server!');
// });


const Single = () => {
  
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

  const textAreaRef = useRef(null);

  const [input, setInput] = useState("")

  const [codes, setCodes] = useState({
    empt:"",
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

  const [buttonText, setButtonText] = useState('Click me');

  const handleClick = () => {
    setButtonText('Button clicked!');
    setTimeout(() => setButtonText('Click me'), 1500);
  }

  return (
    <div className="single">
      <div className="cont">
        <div className="wrap">
          <p>Copy and send your code to the person you want to share with!</p>
          <input onChange={e=>setInput(e.target.value)} placeholder="waiting on code"  readOnly/>
          
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
          <button onClick={sendFile}>Testing</button>
        </div>
      </div>
    </div>
  )
}

export default Single