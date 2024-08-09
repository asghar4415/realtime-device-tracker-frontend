import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import SignUp from './pages/signup';
import SignIn from './pages/login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './pages/dashboard';
import AddMembers from './pages/addmembers';
import Profile from './pages/profile';
import "./App.css";




function App() {



    return (
  
      <>
        <ToastContainer />

      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addmembers" element={<AddMembers />} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="/" element={<Dashboard />} */}

  
  
        </Routes>
      </Router>
  
      </>
    );
  }
  
  export default App;