import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./dashboard.css";
import ResponsiveAppBar from "../components/navbar";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;



export default function Dashboard() {

  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Navigate("/");
    }
  }, []);


  const token = localStorage.getItem("token");
  const user = JSON.parse(atob(token.split(".")[1]));

  // console.log(user.email);

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/dashboard`, {
          params: { email: user.email },
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user.email]);


  
 


  return (
    <div>
      <div className="main">

        <div className="homepage">
          <ResponsiveAppBar/>


<div className="container1">
  <h1 className="header-1"> Hello {data.fullName}</h1>
  
  
</div>


</div>
      </div>

    </div>
  )
}

