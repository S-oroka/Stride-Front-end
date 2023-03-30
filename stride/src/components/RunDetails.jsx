import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const RunDetails = () => {
    const { id } = useParams();
    const [run, setRun] = useState({});
  
    const getRun = async () => {
        const response = await axios.get(`http://localhost:3001/api/runs/run/${id}`);
        console.log(response.data);
        setRun(response.data);
    };
  
    useEffect(() => {
      getRun();
    }, []);
  
    return (
      <div>
        <h1>Distance: {run.distance} mi.</h1>
        <h2>Time: {run.time}</h2>
      </div>
    );
  };
  

export default RunDetails;
