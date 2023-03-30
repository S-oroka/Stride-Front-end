import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Register from './components/Register';
import RunDetails from './components/RunDetails';
import { useEffect, useState } from 'react';
import { CheckSession } from './services/Auth';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login';


function App() {

  const [user, setUser] = useState(null);

  let navigate = useNavigate();

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
    navigate('/')
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }



  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <Navbar
        user={user}
        handleLogout={handleLogout} />
      <div className="App">
        <main>
          <Routes>
            <Route path='/' element={<HomePage user={user} />} />
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/runs/:id' element={<RunDetails />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
