import React from 'react'
import { Link } from 'react-router-dom'



const Home = () => {
  return (
    <div className='home'>
        <h1>Welcome to File Path!</h1>
        <p>To get started click one of the 2 options below</p>
        <div className="laptop">
            <a href="/single">
                <button>Laptop To Laptop</button>
            </a>
        </div>
        <div className="telephone">
            <a href="/phone">
                <button>Phone To Laptop</button>
            </a>
        </div>
        <div className="connecting">
            
        </div>
    </div>
  )
}

export default Home