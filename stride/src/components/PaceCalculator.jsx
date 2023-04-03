import { useState } from 'react';

function PaceCalculator() {
  const [distance, setDistance] = useState(0);
  const [timeHours, setTimeHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);

  function calculatePace() {
    const totalSeconds = (timeHours * 3600) + (minutes * 60) + parseInt(timeSeconds);
    const paceSeconds = totalSeconds / distance;
    const paceMinutes = Math.floor(paceSeconds / 60);
    const paceSecondsRemainder = Math.round(paceSeconds % 60);
    return `${paceMinutes}:${paceSecondsRemainder < 10 ? '0' : ''}${paceSecondsRemainder} per mile`;
  }

  return (
    <div className='max-w-3xl mx-auto justify-center'>
      <div className="my-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="distance">
          Distance (in miles)
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="distance"
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          step="0.01"
          min="0"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
          Time
        </label>
        <div className="flex items-center">
          <input
            className="appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            id="timeHours"
            type="number"
            value={timeHours}
            onChange={(e) => setTimeHours(e.target.value)}
            min="0"
            required
          />
          <span className="text-gray-700 mr-2">:</span>
          <input
            className="appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            id="minutes"
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            min="0"
            max="59"
            required
          />
          <span className="text-gray-700 mr-2">:</span>
          <input
            className="appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            id="timeSeconds"
            type="number"
            value={timeSeconds}
            onChange={(e) => setTimeSeconds(e.target.value)}
            min="0"
            max="59"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <p className="font-bold">{calculatePace()}</p>
      </div>
    </div>
  );
}

export default PaceCalculator;