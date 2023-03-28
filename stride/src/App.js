import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <>
        <Navbar />
      </>
      <>
        <HomePage />
      </>
    </div>
  );
}

export default App;
