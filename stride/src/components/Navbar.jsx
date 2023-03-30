import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  const [nav, setNav] = useState(false);

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 bg-white-700">
      <div className="text-2xl ml-5 text-black">Stride</div>

      {user ? (
        <>
          <ul className="hidden md:flex items-center">
            <li className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-150">
              About
            </li>
            <li
              className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-150"
              onClick={handleLogout}
            >
              Sign Out
            </li>
          </ul>

          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer pr-4 z-10 text-black md:hidden"
          >
            {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>

          {nav && (
            <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-white to-white text-black-500">
              <li
                className="px4 cursor-pointer capitalize py-6 text-4xl"
                onClick={() => setNav(false)}
              >
                About
              </li>
              <li
                className="px4 cursor-pointer capitalize py-6 text-4xl"
                onClick={handleLogout}
              >
                Sign Out
              </li>
            </ul>
          )}
        </>
      ) : (
        <>
          <ul className="hidden md:flex items-center">
            <li className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-150">
              About
            </li>
            <NavLink to='/login' className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-150">Sign In</NavLink>
          </ul>

          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer pr-4 z-10 text-black md:hidden"
          >
            {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>

          {nav && (
            <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-600 text-gray-500">
              <li
                className="px4 cursor-pointer capitalize py-6 text-4xl"
                onClick={() => setNav(false)}
              >
                About
              </li>
              <NavLink to='/login' className="px4 cursor-pointer capitalize py-6 text-4xl">Sign In</NavLink>
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;


// const Navbar = ({ user, handleLogout }) => {
//   const [nav, setNav] = useState(false)
//   let signedIn
//   if (user) {
//     signedIn =
//       <header>
//         <div className='text-2xl ml-5 text-white'>
//           <NavLink to='/'>Stride</NavLink>
//         </div>
//         <ul className='px-5 flex items-center flex-row'>

//           <li className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-150'>
//             <NavLink onClick={handleLogout} to='/'>Sign Out</NavLink>

//           </li>

//           <li className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-150'>
//             <NavLink to='/about'>About</NavLink>
//           </li>
//         </ul>
//       </header>
//   }
//   let signedOut = (
//     <header className='flex justify-between items-center text-white w-full z-10'>
//       <div className='text-2xl ml-5 text-white'>
//         <NavLink to='/'>Stride</NavLink>
//       </div>
//       <ul className='px-5 items-center flex flex-row'>
//         <li className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-150'>
//           <NavLink to='/login'>Sign In</NavLink>
//         </li>
//         <li className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-150'>
//           <NavLink to='/about'>About</NavLink>
//         </li>
//       </ul>
//     </header>
//   )
//   return (
//     <div className='flex justify-between items-center w-full h-20 px-4 bg-slate-700'>
//       {user ? signedIn : signedOut}
//     </div>
//   )
// }