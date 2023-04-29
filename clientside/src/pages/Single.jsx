import { React, useState } from 'react'

const Single = () => {

  const [input, setInput] = useState("")

  const [codes, setCodes] = useState({
    code:"waiting for code",
  })

  const handleChange = (e) => {
    setCodes((prev)=>({...prev, code: input}))
  }

  return (
    <div>
      <h1> sample </h1>
      <input onChange={e=>setInput(e.target.value)} placeholder="waiting on code..." />
      <button onClick={handleChange}> refresh </button>
      <span>code is {codes.code}</span>
    </div>
  )
}

export default Single