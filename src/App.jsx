import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import SignUp from './pages/signup';
import SignIn from './pages/login';




function App() {



    return (
  
      <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
  
  
        </Routes>
      </Router>
  
      </>
    );
  }
  
  export default App;