import React from 'react'
import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { Link, useNavigate } from 'react-router-dom'


const Login = ({ setUser, user }) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({
      email: '',
      password: ''
    })
    setUser(payload)
    navigate('/')
  }

  return (
    <div className=" bg-cover flex items-center justify-center">
      <div className='flex flex-col max-w-md justify-center mx-auto w-full bg-white bg-opacity-80'>
        <h1 className='text-black text-3xl my-20'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col mx-auto'>
          <input type='email' placeholder='Email' onChange={handleChange} name='email' value={formValues.email} className='my-4 bg-transparent border-b-2 text-black outline-none' required />
          <input type='password' placeholder='Password' onChange={handleChange} name='password' value={formValues.password} className='my-4 bg-transparent border-b-2 text-black outline-none' required />
          <div className='flex flex-col text-black my-20'>
            <button className="mb-5 text-black bg-white hover:bg-gray-200 focus:outline-none transition duration-300 ease-in-out">Login</button>
            <Link to='/register'>
              <p></p><button className=''>Sign up</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
