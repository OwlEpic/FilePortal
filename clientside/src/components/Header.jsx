import { React } from 'react'
import Logo from "../img/logo.png"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <Link to="/home">
        <img  src={Logo} alt="" />
      </Link>
    </div>
  )
}

export default Header