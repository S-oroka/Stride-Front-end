import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Client, { api } from '../services/api';


const RunDetails = () => {
    const { id } = useParams();
    const [run, setRun] = useState({});
    const [location, setLocation] = useState({});
    const [locations, setLocations] = useState([]);
    const [locationIds, setLocationIds] = useState([]);
    const [place, setPlace] = useState('');
    const [formattedAddress, setFormattedAddress] = useState('');
    const [editData, setEditData] = useState({
        distance: '',
        time: ''
    });
    const [showEditForm, setShowEditForm] = useState(false);
    const [showLocationForm, setShowLocationForm] = useState(false);

    const API_KEY = 'AIzaSyCOXFtbvRuV6GQnTAv0Yex9X8pMzGbhUlI'

    const getRun = async () => {
        const cachedRun = localStorage.getItem(`run-${id}`);
        if (cachedRun) {
            setRun(JSON.parse(cachedRun));
        } else {
            const response = await Client.get(`/api/runs/run/${id}`);
            console.log(response.data);
            setRun(response.data);
            localStorage.setItem(`run-${id}`, JSON.stringify(response.data));
        }
    };


    const handleAddLocation = async () => {
        const response = await api.get(`/api/geocode/json?address=${place}&key=${API_KEY}`);
        const { lat, lng } = response.data.results[0].geometry.location;
        setLocation({ lat, lng });
        const formattedAddress = response.data.results[0].formatted_address;
        const res = await Client.post(`/api/locations/${id}`, {
            latitude: lat,
            longitude: lng,
            terrain_type: formattedAddress,
        });
        const newLocationId = res.data.id;
        setFormattedAddress(formattedAddress);
        setLocations([...locations, formattedAddress]);
        setLocationIds([...locationIds, newLocationId]);
    };

    const getLocations = async () => {
        const response = await Client.get(`/api/locations/${id}`);
        const filteredLocations = response.data.filter(location => location.run_id === parseInt(id));
        setLocations(filteredLocations.map(location => location.terrain_type));
        setLocationIds(filteredLocations.map(location => location.id));

    };

    const deleteLocation = async (index) => {
        const locationId = locationIds[index];
        await Client.delete(`/api/locations/${locationId}`);
        getLocations();
    };

    const handleRunEdit = async (e) => {
        e.preventDefault();
        await Client.put(`/api/runs/${id}`, {
            distance: editData.distance,
            time: editData.time
        });


        const updatedRun = { ...run, distance: editData.distance, time: editData.time }
        setRun(updatedRun)
        setEditData({
            distance: '',
            time: ''
        });

        localStorage.setItem(`run-${id}`, JSON.stringify({
            ...run,
            distance: editData.distance,
            time: editData.time,
        }));
        setShowEditForm(false);
    };



    const handleEditInputChange = (e) => {
        const { id, value } = e.target;
        setEditData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };


    useEffect(() => {
        getRun();
        getLocations();
    }, []);


    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="text-4xl font-bold mb-4">Distance: {run.distance} mi.</h1>
            <h2 className="text-xl font-semibold mb-8">Time: {run.time}</h2>
            {showEditForm && (
                <form onSubmit={handleRunEdit} className="flex flex-col items-center my-5">
                    <input
                        className="border-2 rounded-md resize-none w-60"
                        type="text"
                        id="distance"
                        placeholder="Distance"
                        value={editData.distance}
                        onChange={handleEditInputChange}
                        maxLength={255}
                    />
                    <input
                        className="border-2 rounded-md resize-none w-60"
                        type="text"
                        id="time"
                        placeholder="Time"
                        value={editData.time}
                        onChange={handleEditInputChange}
                        maxLength={255}
                    />
                    <button
                        type="submit"
                        className="inline-block border-2 rounded-lg bg-white hover:bg-slate-700 hover:text-white text-gray-500 font-semibold py-2 px-4 my-2 transition-all duration-200 ease-in-out transform  hover:scale-110"
                    >
                        Edit
                    </button>
                </form>
            )}
            <div className="flex flex-col items-center justify-center w-full mb-8">
                {showLocationForm && (
                    <div>
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
                )}
                <div>
                    <button
                    onClick={() => setShowEditForm(!showEditForm)}
                    className="bg-blue-500 mx-5 text-white font-semibold py-2 mb-10 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out mt-8"
                >
                    {showEditForm ? 'Cancel' : 'Edit Run'}
                </button>
                    <button
                        onClick={() => setShowLocationForm(!showLocationForm)}
                        className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    >
                        {showLocationForm ? 'Cancel' : 'Add Location'}
                    </button>
                    </div>

            </div>
            {locations.length > 0 && (
                <div className="w-full lg:w-1/2">
                    <ul className="list-disc pl-4">
                        {locations.map((location, index) => (
                            <li key={location}>
                                {location}{' '}
                                <button
                                    onClick={() => deleteLocation(index)}
                                    className="text-red-500 hover:text-red-700 font-semibold"
                                >
                                    (delete)
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

};


export default RunDetails;