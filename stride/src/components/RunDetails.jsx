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
        setLocations(response.data.filter(location => location.run_id === parseInt(id)).map(location => location.terrain_type));
    };
    
      
    
    useEffect(() => {
        getRun();
        getLocations();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center mt-20">
          <h1 className="text-4xl font-bold mb-4">Distance: {run.distance} mi.</h1>
          <h2 className="text-xl font-semibold mb-8">Time: {run.time}</h2>
          <div className="flex flex-col items-center justify-center w-full mb-8">
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Enter a location"
              className="border border-gray-400 rounded-lg py-2 px-4 mb-4 w-full lg:w-1/2"
            />
            <button
              onClick={handleAddLocation}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Add Location
            </button>
          </div>
          {locations.length > 0 && (
            <div className="w-full lg:w-1/2">
              <h3 className="text-lg font-medium mb-2">Locations:</h3>
              <ul className="list-disc list-inside">
                {locations.map((location, index) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
};


export default RunDetails;