import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Grid } from '@mui/material'

const Blogs = () => {

    const [blogs, setBlogs] = useState()

    useEffect(() => {
        axios.get("http://localhost:3001/getblogs").then((response) => {
            setBlogs(response.data);
        });
    }, [])


    const navigate = useNavigate()
    return (
        <div className='blogs-container'>
            <Typography gutterBottom variant="h5" color="white" component="div" sx={{ pl: 5, pt: 5, color: 'black' }}>
                <h1 className='text-center'>Latest Bolgs</h1>
            </Typography>
            <Grid container spacing={5} sx={{ p: 5 }}>
                {blogs && blogs.length > 0 && blogs.map((blog, idx) => (
                    <Grid style={{margin: '0 auto'}} item xs={12} md={4} key={idx}>
                        <Card sx={{ boxShadow: 4, maxHeight: '150px' }}>
                            <CardActionArea style={{backgroundColor: "#1e2129", color: 'gold'}} onClick={() => { navigate(`/blog/${blog.idblogs}`, { replace: true }) }}>
                                <Box sx={{ display: 'flex' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
                                        image={`/images/${JSON.parse(blog.pic)[0]}`}
                                        alt="Live from space album cover"
                                    />
                                    <Box   sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography  component="div" variant="h6">
                                                {blog.title}
                                            </Typography>
                                            <Typography style={{color: 'white'}} variant="subtitle2"  component="div" sx={{ width: '200px', height: '45px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {blog.description}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Blogs