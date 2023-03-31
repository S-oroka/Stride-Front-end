import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const RunDetails = () => {
    const { id } = useParams();
    const [run, setRun] = useState({});
    const [location, setLocation] = useState({});
    const [locations, setLocations] = useState([]);
    const [place, setPlace] = useState('');
    const [formattedAddress, setFormattedAddress] = useState('');

    const apiKey = process.env.REACT_APP_API_KEY;

    const getRun = async () => {
        const cachedRun = localStorage.getItem(`run-${id}`);
        if (cachedRun) {
          setRun(JSON.parse(cachedRun));
        } else {
          const response = await axios.get(`http://localhost:3001/api/runs/run/${id}`);
          console.log(response.data);
          setRun(response.data);
          localStorage.setItem(`run-${id}`, JSON.stringify(response.data));
        }
      };
      

      const handleAddLocation = async () => {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`);
        console.log(response.data);
        const { lat, lng } = response.data.results[0].geometry.location;
        setLocation({ lat, lng });
        const formattedAddress = response.data.results[0].formatted_address;
        await axios.post(`http://localhost:3001/api/locations/${id}`, {
            latitude: lat,
            longitude: lng,
            terrain_type: formattedAddress,
        });
        setFormattedAddress(formattedAddress);
        setLocations([...locations, formattedAddress]);
    };

    const getLocations = async () => {
        const response = await axios.get(`http://localhost:3001/api/locations/${id}`);
        console.log(response.data);
        setLocations(response.data.map(location => location.terrain_type));
    };
    
    useEffect(() => {
        getRun();
        getLocations();
    }, []);

    return (
        <div className='mt-20'>
            <h1>Distance: {run.distance} mi.</h1>
            <h2>Time: {run.time}</h2>
            <div>
                <input type='text' value={place} onChange={(e) => setPlace(e.target.value)} />
                <button className='mt-20' onClick={handleAddLocation}>Add Location?</button>
            </div>
            {locations.length > 0 && (
                <div>
                    <h3>Locations:</h3>
                    <ul>
                        {locations.map((location, index) => (
                            <li key={index}>{location}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


export default RunDetails;