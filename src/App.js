import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/AdminLogin';
import Signup from './components/Signup';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/admin" element={<Admin/>} />
        {/* <Route path="/" element={Home} /> */}
      </Routes>
    </Router>
  );
};

export default App;
