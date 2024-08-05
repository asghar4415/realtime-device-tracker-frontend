import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import "./style.css";
import axios from "axios";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;



const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  



  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{11}$/;
    return phoneNumberRegex.test(phoneNumber);
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(password);
  };

  const handleNameChange = (e) => {
    const fullName = e.target.value;
    setFormData((prev) => ({
      ...prev,
      fullName,
    }));

    if (fullName.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        fullName: "Name is required",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        fullName: "",
      }));
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData((prev) => ({
      ...prev,
      email,
    }));

    if (!validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid email format",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData((prev) => ({
      ...prev,
      password,
    }));

    if (!validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long and include at least one digit, and one special character",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

 
  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    setFormData((prev) => ({
      ...prev,
      phoneNumber,
    }));

    if (!validatePhoneNumber(phoneNumber)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "Invalid phone number format",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "",
      }));
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.fullName) {
      alert("Please enter your name.");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!validatePassword(formData.password)) {
      alert(
        "Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character."
      );
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    
      const registerRsp = await axios.post(
        `${apiUrl}/signup`,
        formData
      );
      console.log(registerRsp);
      if(registerRsp.data.status === 200) {
      toast.success(`Thankyou for Signing up.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/");
    }
      else{
        toast.error(`Error: ${registerRsp.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
  };

 

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className='head'>
          <h1 className='head-1'>
            Nazar
          </h1>
          <div >
            <img src="public/polygonal-vector-illustration-of-city-map-and-location-pin-on-white-background-gps-navigation-system-concept-2PX48BJ.jpg" alt=""
            className="head-pic" />
          </div>
          

          </div>
          <Typography component="h1" variant="h5"
          style={
            {
               fontFamily: "Josefin Sans",
               fontSize: "30px",
            }
          }>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={
            submitHandler
          } sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="123-456-7890"
                  onChange={handlePhoneNumberChange}  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end" className='end-b' >
              <Grid item>
                <Link onClick = {() => navigate('/')}
                style={{cursor: 'pointer'}}
                 variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}