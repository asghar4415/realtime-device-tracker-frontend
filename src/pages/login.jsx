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
import axios from "axios";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;

import "./style.css";




// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {

  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Email and password cannot be empty", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    
      const loginRsp = await axios.post(`${apiUrl}/login`, formData);
      // console.log(loginRsp);
      if(loginRsp.data.status === true){

      localStorage.setItem("token", loginRsp.data.token);
      toast.success(`Welcome `, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      Navigate("/dashboard");
    } else {

   
      toast.error("Either Email or password is incorrect", {
        position: "top-right",
        autoClose: 2000,
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
    <ThemeProvider theme={defaultTheme}
   >
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
            <img src="/polygonal-vector-illustration-of-city-map-and-location-pin-on-white-background-gps-navigation-system-concept-2PX48BJ.jpg" alt=""
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
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                // console.log(e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                // console.log(e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submitHandler}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => 
                  Navigate('/signup')
                }
                style={{cursor: 'pointer'}}

                 variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}