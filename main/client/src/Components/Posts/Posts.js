import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Grid } from '@mui/material'
import axios from 'axios'
import mainlogo from '../assets/mainlogo.png'
import { model } from '@tensorflow/tfjs'

const Posts = ({ posts }) => {

    const [modelData, setModelData] = useState(null)

    const user = JSON.parse(localStorage.getItem('estateUser'))
    if (user) {
        console.log("DATA COMMING FOR USER", user)
    }

    const navigate = useNavigate()

    async function HandleCall(ownername, owneremail, phone, title, desc, purpose, demand) {
        const emaildata = {
            ownername: ownername,
            owneremail: owneremail,
            phone: phone,
            title: title,
            desc: desc,
            purpose: purpose,
            demand: demand,
            clientname: user.firstname + ' ' + user.lastname,
            clientemail: user.email
        };
        const response = await axios.post("http://localhost:3001/email/meeting", { emaildata, uxair: "uxair" })

        const data = await response.data

        if (data.status === 'ok') {

            document.getElementById("mailAlert").classList.remove("d-none")
            setTimeout(() => {
                document.getElementById("mailAlert").classList.add("d-none")
            }, 3000);
        } else {
            alert("EMAIL ERROR")
        }
    }

    useEffect(() => {

    }, [])

    console.log("DATA COMMING FOR POSTS", posts)


    return (
        <Box className='posts-container' >
            <Typography gutterBottom variant="h5" color="white" component="div" sx={{ pl: 5, pt: 5, color: 'black' }}>
                <h1 className='text-center'>Property Available</h1>
                <div id="mailAlert" class="alert mail-alert text-center d-none fixed-top" role="alert">
                    <i className='fa fa-comment'></i> Your invitation has been sent successfully!<br />Owner will contact you as soon as possible
                </div>
            </Typography>
            <Grid container spacing={5} sx={{ p: 5 }}>
                {posts && posts.length > 0 ? posts.map((post, idx) => (
                    <Grid item xs={12} style={{ margin: '0 auto' }} md={3} key={idx}>
                        <Card sx={{ boxShadow: 4 }}>
                            <CardActionArea onClick={() => { navigate(`/post/${post.idposts}`, { replace: true }) }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`/images/${JSON.parse(post.pics)[0]}`}
                                    alt={post.title}
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h6">
                                        <span style={{ fontWeight: '700', fontSize: '24px' }} className="gradient-text  ">{post.title}</span>
                                    </Typography>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography variant="p" >
                                            {post.type}
                                        </Typography>
                                        <Typography variant="p" sx={{ ml: 5 }}>
                                            {post.purpose}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2">
                                        {post.location}
                                    </Typography>
                                    <Typography variant="body2" >
                                        {post.description}
                                    </Typography>
                                    <Typography variant="p">
                                        <span className='post-span'>Price:</span> {post.demand}
                                    </Typography>

                                </CardContent>
                            </CardActionArea>

                            {user ?
                                <div className='text-right' style={{ textAlign: 'right', padding: '0 10px 10px 0' }}>
                                    <span className='text-success text-left' style={{ fontWeight: '700', verticalAlign: 'middle' }}>Schedule Call: </span>
                                    <button onClick={() => {setModelData(post.number)}}  style={{ borderRadius: '50%' }} className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#call-modal" data-bs-whatever="@mdo"><i className='fa fa-whatsapp'></i></button>


                                    {/* Invite button  */}
                                    <button onClick={() => {
                                        console.log("EMAIL OF OWNER: " + post.demand)
                                        HandleCall(
                                            post.firstname + ' ' + post.lastname,
                                            post.email,
                                            post.number,
                                            post.title,
                                            post.description,
                                            post.purpose,
                                            post.demand
                                        );
                                    }} className='btn btn-success' style={{ borderRadius: '30px', marginLeft: '0.3rem' }}><i className='fa fa-phone'></i> Send Email</button>
                                </div>
                                : null}


                        </Card>
                    </Grid>
                )) : <Typography sx={{ p: 5 }}>No Posts found</Typography>
                }
                <div className="modal fade" id='call-modal' tabindex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header ">
                                <h5 style={{ textAlign: 'center' }} className=" text-success">Contact Owner</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-center">
                                <p className='modal-numbers'><i className='fa fa-whatsapp'></i> Mobile: {modelData}</p>
                                <p className='modal-numbers'><i className='fa fa-phone'></i> Phone: {modelData}</p>
                                <hr />
                                <p>Please quote property reference when calling us</p>
                                <img src={mainlogo} alt=">" width={100} />
                                <hr />

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </Grid>
        </Box>
    )
}

export default Posts