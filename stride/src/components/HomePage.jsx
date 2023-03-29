import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const HomePage = ({ user }) => {
  const { id } = user ? user : {};

  const [runs, setRuns] = useState(null)

  const getUserRuns = async () => {
    try {
      const userRuns = await axios.get(`http://localhost:3001/api/runs/${id}`)
      console.log(userRuns)
      setRuns(userRuns.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (user && id) { // added id check
      getUserRuns()
    }
  }, [user, id]) // added id dependency

  return (
    <div className='mt-10 max-w-screen flex justify-center'>
        <div>
          <h1>Your Runs</h1>
          {user && runs && runs.length > 0 ? (
            <ul>
              {runs.map(run => (
                <li key={run.id} className="my-5">
                  <h1>Distance: {run.distance}</h1>
                   <h2>Time: {run.time}</h2>
                </li>
              ))}
            </ul>
          ) : (
            <p>No runs found.</p>
          )}
        </div>
        <div>
          
        </div>
    </div>
  )
}

export default HomePage

