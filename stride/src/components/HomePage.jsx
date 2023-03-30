import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaPlusCircle } from 'react-icons/fa';
import axios from 'axios'

const HomePage = ({ user }) => {
  const { id } = user ? user : {};

  const [runs, setRuns] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')

  const getUserRuns = async () => {
    try {
      const userRuns = await axios.get(`http://localhost:3001/api/runs/${id}`)
      console.log(userRuns)
      setRuns(userRuns.data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteRun = async (id) => {
    await axios.delete(`http://localhost:3001/api/runs/${id}`)
    getUserRuns()
  }
  

  const createRun = async () => {
    const newRun = { distance, time }
    const run = await axios.post(`http://localhost:3001/api/runs/${id}`, newRun)
    setShowForm(false)
    setDistance('')
    setTime('')
    getUserRuns()
  }

useEffect(() => {
    getUserRuns()
  }, [])

  useEffect(() => {
    if (user && id) { // added id check
      getUserRuns()
    }
  }, [user, id]) // added id dependency

  return (
    <div className='mt-10 max-w-screen-md mx-auto flex flex-col justify-center items-center'>
      <h1 className='text-3xl mb-4'>Your Runs</h1>
      {!showForm && <FaPlusCircle onClick={() => setShowForm(true)} size={30} className='text-4xl text-red-400 hover:cursor-pointer' />}
      {showForm && (
        <div className='mb-4'>
          <input type='number' placeholder='Miles' value={distance} onChange={(e) => setDistance(e.target.value)} />
          <input type='text' placeholder='hr:mn:sec' value={time} onChange={(e) => setTime(e.target.value)} />
          <button onClick={createRun}>Submit</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}
      {user && runs && runs.length > 0 ? (
        <ul className='w-full'>
          {runs.map(run => (
            <li key={run.id} className="my-5 border-b pb-3">
              <h1 className='text-xl'>Distance: {run.distance} mi.</h1>
              <h2 className='text-md'>Time: {run.time}</h2>
              <button className='text-sm text-blue-400' onClick={() => deleteRun(run.id)}>X</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-lg text-center'>Please Sign In</p>
      )}
    </div>
  )
}

export default HomePage
