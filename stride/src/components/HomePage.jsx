import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
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
    if (user && id) {
      getUserRuns()
    }
  }, [user, id])

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 py-10">
      <h1 className="text-3xl mb-4">Your Runs</h1>
      {!showForm && user && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center fixed bottom-10 right-10 shadow-lg"
        >
          <FaPlusCircle size={30} />
        </button>
      )}
      {showForm && (
        <div className="mb-4 w-full">
          <input
            type="number"
            placeholder="Miles"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="block w-full rounded-md bg-gray-200 py-2 px-4 mb-2"
          />
          <input
            type="text"
            placeholder="--:--:--"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="block w-full rounded-md bg-gray-200 py-2 px-4 mb-2"
          />
          <div className="flex justify-end">
            <button
              onClick={createRun}
              className="bg-blue-500 text-white rounded-full py-2 px-4 mr-2">
              Submit
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white rounded-full py-2 px-4">
              Cancel
            </button>
          </div>
        </div>
      )}
      {user && runs && runs.length > 0 ? (
        <ul className="w-full">
          {runs.map((run) => (
            <NavLink to={`/runs/${id}`} key={run.id} className="my-5 border-b pb-3 w-full">
              <h1 className="text-xl mb-2">Distance: {run.distance} mi.</h1>
              <h2 className="text-md">Time: {run.time}</h2>
              <button
                className="text-sm text-blue-400 mt-10"
                onClick={() => deleteRun(run.id)}
              >
                X
              </button>
            </NavLink>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-center">Please Sign In</p>
      )}
    </div>
  );

}

export default HomePage
