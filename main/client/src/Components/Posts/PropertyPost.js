import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import ImageSlider from '../ImageSlider/ImageSlider';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
}));

const Heading = styled(Typography)(() => ({
    fontSize: '32px',
    fontWeight: 800,
    opacity: 1
}));

const Text = styled(Typography)(() => ({
    paddingTop: 4,
    fontSize: '16px',
    fontWeight: 100,
}));

const PropertyPost = () => {

    const [post, setPost] = useState()
    const user = JSON.parse(localStorage.getItem('estateUser'))
    const navigate = useNavigate()
    const url = window.location.href
    const lastsegment = Number(url.split("/").pop())
    console.log(lastsegment)

    useEffect(() => {
        axios.post("http://localhost:3001/getsinglepost",
            { postId: lastsegment }
        ).then((response) => {
            setPost(response.data);
        });
    }, [lastsegment])

    const handleDelete = () => {
        try {
            axios.post("http://localhost:3001/deletepost",
                { postId: lastsegment }
            ).then((response) => {
                if (response) {
                    alert("Post Deleted Successfully")
                    navigate('/dashboard', { replace: true })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={{ margin: '5rem 0' }}>
            {post && post.length > 0 && post.map((post, idx) => (
                <Box sx={{ flexGrow: 1, p: 5 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Box>
                                <ImageSlider images={post.pics} />
                            </Box>
                            <Box sx={{ mt: 4 }}>
                                <Heading>
                                    {post.title}
                                </Heading>
                                <Text>
                                    {post.description}
                                </Text>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>
                                <Box >
                                    <Text>
                                        Name : {post.firstname + post.lastname}
                                    </Text>
                                    <Text>
                                        Number : {post.number}
                                    </Text>
                                    <Text>
                                        Location : {post.location}
                                    </Text>
                                    <Text>
                                        Area : {post.area}
                                    </Text>
                                    <Text>
                                        Demand : {post.demand}
                                    </Text>
                                    <Text>
                                        Type : {post.type}
                                    </Text>
                                    <Text>
                                        Purpose : {post.purpose}
                                    </Text>
                                </Box>
                            </Item>
                            {
                                user ?
                                    <button style={{ width: '100%', fontSize: '1.2rem', padding: '0.5rem 0', fontWeight: '700' }} className='mt-3 btn btn-danger home-buttons' onClick={handleDelete}>Delete</button>
                                    : <div className='pre-alert text-center rounded bg-warning'>
                                        <p className='p-4 '>Please create an account or login first to contact the owner thorugh our wesbite</p>
                                        <a className='btn btn-dark home-buttons mb-3'style={{width: "80%", margin: '0 auto'}}>Create Account</a>
                                    </div>
                            }
                        </Grid>
                    </Grid>
                </Box>
            ))}
        </div>
    )
}

export default PropertyPost