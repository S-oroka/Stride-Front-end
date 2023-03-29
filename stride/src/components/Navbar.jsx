import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Navbar = ({ user, handleLogout }) => {
  const [nav, setNav] = useState(false)
  let signedIn
  if (user) {
    signedIn =
      <header>
        <div className='text-2xl ml-5 text-white'>
          <NavLink to='/'>Stride</NavLink>
        </div>
        <ul className='px-5 flex items-center flex-row'>

          <li className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-150'>
            <NavLink onClick={handleLogout} to='/'>Sign Out</NavLink>

          </li>

          <li className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-150'>
            <NavLink to='/about'>About</NavLink>
          </li>
        </ul>
      </header>
  }
  let signedOut = (
    <header className='flex justify-between items-center text-white w-full z-10'>
      <div className='text-2xl ml-5 text-white'>
        <NavLink to='/'>Stride</NavLink>
      </div>
      <ul className='px-5 items-center flex flex-row'>
        <li className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-150'>
          <NavLink to='/login'>Sign In</NavLink>
        </li>
        <li className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-150'>
          <NavLink to='/about'>About</NavLink>
        </li>
      </ul>
    </header>
  )
  return (
    <div className='flex justify-between items-center w-full h-20 px-4 bg-slate-700'>
      {user ? signedIn : signedOut}
    </div>
  )
}


export default Navbar
