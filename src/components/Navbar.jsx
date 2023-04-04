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
            <NavLink onClick={() => setNav(false)} to='/' className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-150">
              Your Runs
            </NavLink>
            <NavLink onClick={() => setNav(false)} to='/pace' className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-150">
              Pace Calculator
            </NavLink>
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
              <NavLink onClick={() => setNav(false)} to='/' className="px4 cursor-pointer capitalize py-6 text-4xl">Your Runs</NavLink>
              <NavLink onClick={() => setNav(false)} to='/pace' className="px4 cursor-pointer capitalize py-6 text-4xl">Pace Calculator</NavLink>
              <li
                className="px4 cursor-pointer capitalize py-6 text-4xl"
                onClick={() => {
                  handleLogout();
                  setNav(false);
                }}
              >
                Sign Out
              </li>

            </ul>
          )}
        </>
      ) : (
        <>
          <ul className="hidden md:flex items-center">
            <NavLink onClick={() => setNav(false)} to='/' className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-150">
              Home
            </NavLink>
            <NavLink onClick={() => setNav(false)} to='/pace' className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-150">
              Pace Calculator
            </NavLink>
            <NavLink onClick={() => setNav(false)} to='/login' className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-150" >Sign In</NavLink>
          </ul>
          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer pr-4 z-10 text-black md:hidden"
          >
            {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>

          {nav && (
            <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-white to-white text-black-500">
              <NavLink onClick={() => setNav(false)} to='/' className="px4 cursor-pointer capitalize py-6 text-4xl">Home</NavLink>
              <NavLink onClick={() => setNav(false)} to='/pace' className="px4 cursor-pointer capitalize py-6 text-4xl">Pace Calculator</NavLink>
              <NavLink onClick={() => setNav(false)} to='/login' className="px4 cursor-pointer capitalize py-6 text-4xl">Sign In</NavLink>
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;