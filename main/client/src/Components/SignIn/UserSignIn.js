import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { Box, Container, Avatar, Grid, Typography, TextField, Button, InputAdornment, OutlinedInput, IconButton, FormControl, InputLabel } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import vector from '../assets/vector5.jpg'


const UserSignIn = () => {

    const navigate = useNavigate()
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

        if (email && password) {
            try {
                await axios.post("http://localhost:3001/signin", {
                    email: email,
                    password: password,
                }).then((response) => {
                    if (response.data.result) {
                        window.localStorage.setItem("estateUser", JSON.stringify(response.data.result))
                        // alert('Login Successfull')
                        navigate("/dashboard", { replace: true })
                        window.location.reload()
                    }
                    else if (response.data.message) alert(response.data.message)
                    else alert("User Not Found")
                }
                )
            } catch (error) {
                console.log(error)
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
                <Link to="/">
                    <IconButton >
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#02385b' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
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
                        <button
                            type="submit"
                            className='btn btn-dark home-buttons mt-3'
                            style={{width: "100%"}}
                        >
                            Log In
                        </button>
                        <div className='text-center mt-3'>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </div>
                    </Box>
                </Box>
            </div>
        </div>

    )
}

export default UserSignIn