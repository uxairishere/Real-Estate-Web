import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { Box, Container, Avatar, Grid, Typography, TextField, OutlinedInput, Button, IconButton, InputAdornment, FormControl, InputLabel } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import vector from '../assets/vector4.jpg'



const UserSignUp = () => {
    const navigate = useNavigate()
    const [firstname, setfirstname] = useState();
    const [lastname, setLastname] = useState();
    const [number, setNumber] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);



    const handleClickShowPassword = (event) => {
        setShowPassword(!showPassword)
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (firstname && lastname && email && password && number && address) {
            try {
                await axios.post("http://localhost:3001/signup", {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    number: number,
                    address: address
                }).then((response) => {
                    if (response.data.result) {
                        navigate('/signin', { replace: true });
                        // window.location.reload()
                    }
                    else if (response.data.message) alert(response.data.message)
                })
            } catch (err) {
                console.log(err)
            }
        }
        else {
            alert("Please provide all information")
        }
    };


    return ( 
        <div className='signup-container row'>
            <div className='col-md-6'>
                <img className='mt-4' src={vector} alt="?" width="100%" />
            </div>
            <div className='col-md-6'>
                {/* <Container component="main" maxWidth="xs" > */}
                    
                    <Box
                        sx={{
                            marginTop: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#02385b' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={(e) => { setfirstname(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={(e) => { setLastname(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="number"
                                        label="Phone Number"
                                        name="number"
                                        autoComplete="number"
                                        onChange={(e) => { setNumber(e.target.value) }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        autoComplete="address"
                                        onChange={(e) => { setAddress(e.target.value) }}
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
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl sx={{ width: '100%' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            autoComplete="new-password"
                                            onChange={(e) => { setPassword(e.target.value) }}
                                            endAdornment={
                                                <InputAdornment position="end" sx={{ backgroungColor: 'transparent' }}>
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <button style={{width: '100%'}} type="submit" className='mt-3 btn btn-dark home-buttons' >Sign Up</button>
                            <div className='text-center mt-3'>
                                <Grid item>
                                    <Link to="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </div>
                        </Box>
                    </Box>
                {/* </Container> */}
            </div>
        </div>

    )

}

export default UserSignUp