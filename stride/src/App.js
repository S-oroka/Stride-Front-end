import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import { useEffect, useState } from 'react';
import { CheckSession } from './services/Auth';
import { Route, Routes, useNavigate } from 'react-router-dom'


function App() {

  const [user, setUser] = useState(null);

  let navigate = useNavigate();

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <>
        <Navbar user={user}/>
      </>
      <>
        <HomePage />
      </>
    </div>
  );
}

export default App;
