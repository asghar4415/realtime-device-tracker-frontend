import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import ResponsiveAppBar from "../components/navbar";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
const apiUrl = import.meta.env.VITE_API_URL;

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function AddMembers() {
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState("success"); // "success" or "error"
    const [state, setState] = useState({
        open: false,
        Transition: SlideTransition,
    });

    const navigate = useNavigate();
    const [memberAddEmail, setMemberAddEmail] = useState("");
    const token = localStorage.getItem("token");
    const user = JSON.parse(atob(token.split(".")[1]));

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    const handleMembersAdd = (e) => {
        setMemberAddEmail(e.target.value);
    };

    const addMembertoprofile = async () => {
        try {
            // console.log(user.email);
            const response = await axios.post(`${apiUrl}/addmember`, {
                email: user.email,
                memberemail: memberAddEmail,
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error adding member:", error);
        }
    };

    const handleClick = async () => {
        if (memberAddEmail === "") {
            setSnackbarMessage("Please enter an email address");
            setSnackbarType("error");
            setOpen(true);
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/dashboard`, {
                params: { email: memberAddEmail },
            });

            if (response.data.data.email === memberAddEmail) {

                const addMember = await addMembertoprofile();
                // console.log(addMember);


                if (addMember.status == true) {
                    setSnackbarMessage("Member Added");
                    setSnackbarType("success");
                    setOpen(true);

                }
                else {
                    setSnackbarMessage("Member already added / You cannot add yourself");
                    setSnackbarType("error");
                    setOpen(true);
                }


            } else {
                setSnackbarMessage("Member not found");
                setSnackbarType("error");
                setOpen(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setSnackbarMessage("Email not found");
            setSnackbarType("error");
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <div className="main">
                <div className="homepage">
                    <ResponsiveAppBar />
                    <div className="container1">
                        <h1 className="header-2">Add members</h1>
                        <div className="input-members">
                            <Box
                                component="form"
                                sx={{
                                    "& > :not(style)": { m: 1, width: 500, maxWidth: "100%" },
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="fullWidth"
                                    fullWidth
                                    label="Enter email address"
                                    variant="standard"
                                    onChange={handleMembersAdd}
                                />
                            </Box>
                        </div>
                        <div className="add-button">
                            <Button onClick={handleClick} className="button-1">Add member</Button>
                            <Snackbar
                                open={open}
                                autoHideDuration={3000}
                                onClose={handleClose}
                                TransitionComponent={SlideTransition}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity={snackbarType}
                                    variant="filled"
                                    sx={{ width: "100%" }}
                                >
                                    {snackbarMessage}
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
