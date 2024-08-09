import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./dashboard.css";
import ResponsiveAppBar from "../components/navbar";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(8, 89, 203, 0.733)',
    color: theme.palette.common.white,
    fontFamily: "Josefin Sans",
    fontSize: 16,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Josefin Sans",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, email, phone, live) {
  return { name, email, phone, live };
}



export default function Profile() {

  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Navigate("/");
    }
  }, []);

  const [rows, setRows] = useState([]);


  const token = localStorage.getItem("token");
  const user = JSON.parse(atob(token.split(".")[1]));

  // console.log(user.email);

  const [data, setData] = useState({});

  const [members, setMembers] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/dashboard`, {
          params: { email: user.email },
        });
        setData(response.data.data);
        setMembers(response.data.data.membersadded);
        // console.log(response.data.data.membersadded);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user.email]);

  useEffect(() => {
    const addMembers = () => {
      if (members.length > 0) {
        const rows = members.map((member) => {
          return createData(member.fullName, member.email, member.phoneNumber, member.live);
        });
        setRows(rows);
      }
    }
    addMembers();
  }
    , [members]);






  return (
    <div>
      <div className="main">

        <div className="homepage">
          <ResponsiveAppBar />


          <div className="container1">
            <h1 className="header-1"> Hello {data.fullName}</h1>

            <div className="memberstable">

              <TableContainer component={Paper} >
                <Table sx={{ minWidth: 700 }}
                  aria-label="customized table">
                  <TableHead >
                    <TableRow >
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">Email address </StyledTableCell>
                      <StyledTableCell align="right">Phone Number</StyledTableCell>
                      <StyledTableCell align="right">Live</StyledTableCell>
                      {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.length === 0 ? (
                      <StyledTableRow>
                        <StyledTableCell colSpan={4} align="center">
                          No members added yet.
                        </StyledTableCell>
                      </StyledTableRow>
                    ) : (
                      rows.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.phone}</StyledTableCell>
                          <StyledTableCell align="right">{row.email}</StyledTableCell>
                          <StyledTableCell align="right">{row.live}</StyledTableCell>
                          {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                        </StyledTableRow>
                      ))
                    )}

                  </TableBody>
                </Table>
              </TableContainer>
            </div>


          </div>


        </div>
      </div>

    </div>
  )
}

