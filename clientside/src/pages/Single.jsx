import { React, useState } from 'react'
import { FileUploader } from "react-drag-drop-files";


const Single = () => {

  const fileTypes = ["JPG", "PNG", "GIF"];

  const [file, setFile] = useState(null);
  const handleChangeFile = (file) => {
    setFile(file);
    const reader = new FileReader()

    reader.readAsBinaryString(file)
    reader.onloadend = (event) => {console.log(reader.result)};
  };

  const [input, setInput] = useState("")

  const [codes, setCodes] = useState({
    code:"waiting for code",
  })

  const handleChange = (e) => {
    setCodes((prev)=>({...prev, code: input}))
  }

  return (
    <div className='single'>
      <h1> sample </h1>
      <div className="displayCode">
        <input onChange={e=>setInput(e.target.value)} placeholder="waiting on code..." />
        <button onClick={handleChange}> refresh </button>
        <span>code is {codes.code}</span>
      </div>
      <FileUploader className="fileDrop" handleChange={handleChangeFile} name="file" types={fileTypes}>
        <h1>
          hi
        </h1>
      </FileUploader>
    </div>
  )
}

export default Single