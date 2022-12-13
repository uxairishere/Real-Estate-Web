import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, NavLink } from "react-router-dom";

import mainlogo from '../assets/mainlogo.png'

import './Header.css'

const navItems = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'About',
        link: '/aboutus'
    },
    {
        name: 'Contact',
        link: '/contactus'
    },
    {
        name: 'Prediction',
        link: '/prediction'
    }
];

const navAccount = [
    {
        name: 'Sign Up',
        link: '/signup'
    },
    {
        name: 'Sign In',
        link: '/signin'
    }
]



const Header = () => {

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [loginStatus, setLoginstatus] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("estateUser")
        if (user) setLoginstatus(true)

    }, [loginStatus])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        window.localStorage.clear()
        window.location.reload()
    }


    return (
        <div className='nav-container' style={{backgroundColor: '#28282a'}}>
        <Box className='container'>
            <AppBar position="fixed" sx={{ backgroundColor: '#28282a', padding: '0 5rem' }} >
                <Toolbar>
                    <IconButton
                        // size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                    >
                        <Link to='/' style={{ textDecoration: 'none', color: 'transparent' }}>
                            <img src={mainlogo} alt="loading..." width="100"/>
                        </Link>

                    </IconButton>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, padding: '10px' }}>
                        {navItems.map((item, i) => (
                            <div key={i} >
                                <Link to={item.link}>
                                    <Box className='linktext' component="button" sx={{ padding: '10px' }}>
                                        <Typography variant="p" >
                                            {item.name}
                                        </Typography>
                                    </Box>
                                </Link>
                            </div>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, padding: '10px' }}>
                        {loginStatus &&
                            <div style={{ display: 'flex' }} >
                                <div>
                                    <Link to='/dashboard/addblog'>
                                        <Box className='linktext' component="button" sx={{ padding: '' }} >
                                            <Typography variant="p" >
                                            <i className='fa fa-plus'></i> Blog
                                            </Typography>
                                        </Box>
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/dashboard/addpost'>
                                        <Box className='linktext' component="button" sx={{ padding: '' }} >
                                            <Typography variant="p" >
                                            <i className='fa fa-plus'></i> Post
                                            </Typography>
                                        </Box>
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/dashboard'>
                                        <Box className='linktext' component="button" sx={{ padding: '' }} >
                                            <Typography variant="p" style={{color: 'greenyellow'}} >
                                                Profile
                                            </Typography>
                                        </Box>
                                    </Link>
                                </div>
                                <div>
                                    <Box className='linktext' component="button" sx={{ padding: '' }} onClick={handleLogout}>
                                        <Typography variant="p" >
                                            <span style={{color: 'red', fontWeight: '700'}}>Log out</span>
                                        </Typography>
                                    </Box>
                                </div>
                            </div>
                        }
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, padding: '10px' }}>
                        {!loginStatus && navAccount.map((item, i) => (
                            <div key={i}>
                                <Link to={item.link}>
                                    <Box className='linktext' component="button" sx={{ padding: '10px' }}>
                                        <Typography variant="p" >
                                            {item.name}
                                        </Typography>
                                    </Box>
                                </Link>
                            </div>
                        ))}
                    </Box>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ backgroundColor: "#28282a" }}>

                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, backgroundColor: "#28282a", },
                    }}
                >
                    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                        <Typography variant="p" sx={{ my: 2, color: "white" }}>
                            Real Estate
                        </Typography>
                        <Divider />
                        <List>
                            {navItems.map((item, i) => (
                                <ListItem key={i} disablePadding>
                                    <NavLink to={item.link} style={{ textDecoration: 'none', width: '100%' }}>
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                            <ListItemText sx={{ color: "white" }} >
                                                {item.name}
                                            </ListItemText>
                                        </ListItemButton>
                                    </NavLink>
                                </ListItem>
                            ))}
                            {!loginStatus && navAccount.map((item, i) => (
                                <ListItem key={i} disablePadding>
                                    <NavLink to={item.link} style={{ textDecoration: 'none', width: '100%' }}>
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                            <ListItemText sx={{ color: "white" }} >
                                                {item.name}
                                            </ListItemText>
                                        </ListItemButton>
                                    </NavLink>
                                </ListItem>
                            ))}
                            {loginStatus &&
                                <>
                                    <ListItem disablePadding>
                                        <NavLink to='/dashboard/addblog' style={{ textDecoration: 'none', width: '100%' }}>
                                            <ListItemButton sx={{ textAlign: 'center' }}>
                                                <ListItemText sx={{ color: "white" }} >
                                                    Add Blog
                                                </ListItemText>
                                            </ListItemButton>
                                        </NavLink>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <NavLink to='/dashboard/addpost' style={{ textDecoration: 'none', width: '100%' }}>
                                            <ListItemButton sx={{ textAlign: 'center' }}>
                                                <ListItemText sx={{ color: "white" }} >
                                                    Add Post
                                                </ListItemText>
                                            </ListItemButton>
                                        </NavLink>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <NavLink to='/dashboard' style={{ textDecoration: 'none', width: '100%' }}>
                                            <ListItemButton sx={{ textAlign: 'center' }}>
                                                <ListItemText sx={{ color: "white" }} >
                                                    Dashboard
                                                </ListItemText>
                                            </ListItemButton>
                                        </NavLink>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
                                            <ListItemText sx={{ color: "white" }} >
                                                Log Out
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            }
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </Box>
        </div>
    );
}

export default Header