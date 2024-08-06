import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import SignUp from './pages/signup';
import SignIn from './pages/login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './pages/dashboard';
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

          {/* <Route path="/" element={<Dashboard />} */}

  
  
        </Routes>
      </Router>
  
      </>
    );
  }
  
  export default App;