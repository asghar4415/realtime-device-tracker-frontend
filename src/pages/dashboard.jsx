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

  return (
    <div>
      <div className="main">

        <div className="homepage">
          <ResponsiveAppBar />


          <div className="container1 ">
            <h1 className="header-1 "> About Us </h1>
            <div className="about-container text-focus-in">
              <div className="con-1">
                <p className="">
                At Realtime Device Tracker, we prioritize the safety of your loved ones by providing an easy and secure way to track their real-time locations. Whether it's friends or family, you can add them to your profile, and once they confirm with a unique code, you'll be able to see their live location when they go online. This ensures transparency, as your loved ones will always know when they're being tracked, creating a safe and trustworthy environment for everyone. Stay connected and keep peace of mind with Realtime Device Tracker!
                </p>
              </div>
              <div className="con-2">
                <img src="/side-view-woman-holding-smartphone.jpg" alt="" />
              </div>
            </div>
           


          </div>


        </div>
      </div>

    </div>
  )
}

