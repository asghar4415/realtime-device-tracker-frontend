import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [live, setLive] = useState();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
      const user = JSON.parse(atob(token.split(".")[1]));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/dashboard`, {
          params: { email: user.email },
        });
        console.log(response);
  
        if (response.data.data.live === "false") {
          setLive(false);
        } else if(response.data.data.live === "true") {
          setLive(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData(); // Call the async function
  }, []);
  
  

  

  const handleToggleLive = async () => {
    console.log("Toggling live status");
    try {
      console.log("Live status:", live);
      if (live == "false") {
        console.log("Sending request to /golive");
        const response = await axios.post(`${apiUrl}/golive`, {
          email: user.email,
        });
        console.log("Response data:", response.data); // Log actual data
        setLive(true);
      } else if (live ==  "true") {
        console.log("Sending request to /endlive");
        const response = await axios.post(`${apiUrl}/endlive`, {
          email: user.email,
        });
        console.log("Response data:", response.data); // Log actual data
        setLive(false);
      }
      else{
        console.log("Error");
      }
    } catch (error) {
      console.error("Error toggling live status:", error);
    }
  };
  
  
  

  return (
    <AppBar position="static" className="navbar-1">
      <Container maxWidth="xl" className="navbar-1-1">
        <Toolbar disableGutters className="inner-nav">
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Grey Qo",
              fontSize: "2rem",
              marginRight: "3rem",
              fontWeight: 600,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Nazar
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Dashboard
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    navigate("/addmembers");
                  }}
                >
                  Add members
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Grey Qo",
              fontWeight: 600,
              fontSize: "1.9rem",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Nazar
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/profile");
              }}
              style={{
                fontFamily: "Josefin Sans",
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Profile
            </Button>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/dashboard");
              }}
              style={{
                fontFamily: "Josefin Sans",
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Dashboard
            </Button>
            <Button
              style={{
                fontFamily: "Josefin Sans",
              }}
              onClick={() => {
                handleCloseNavMenu();
                navigate("/addmembers");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Add members
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }} className="live-btn">
            <FormGroup>
              <FormControlLabel
                label="Go live"
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={live}
                    onChange={handleToggleLive}
                  />
                }
              />
            </FormGroup>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  style={{
                    fontFamily: "Josefin Sans",
                  }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
