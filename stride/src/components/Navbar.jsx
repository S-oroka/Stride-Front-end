import React from 'react'

const Navbar = ({user, handleLogout}) => {
  let signedIn
       if (user) {
         signedIn = 
         <header>
           <h1>{user.name}</h1>
           <button onClick={handleLogout}>Logout</button>
         </header>
       }
       let signedOut = (
         <header
         ></header>
       )
  return (
    <div>
      {user ? signedIn : signedOut}
    </div>
  )
}


export default Navbar
