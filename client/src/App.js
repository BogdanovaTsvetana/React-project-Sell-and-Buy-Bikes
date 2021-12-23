import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext.js';

import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import Logout from './components/Logout/Logout.js';

import Header from './components/Header/Header.js';
import Home from './components/Home/Home.js';
import Create from './components/Bikes/Create/Create.js'


import './App.css'

function App() {
 
  return (
    <AuthProvider>
    <div className='container'>
      
      <Header />

      <div id="main-container">
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list/create" element={<Create />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

          </Routes>
        
      </div>

      <footer>
        <p>@ React Project Buy and Sell Bikes</p>
      </footer> 
    </div>
    </AuthProvider>
  );
}

export default App;
