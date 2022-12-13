import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import { Box, Grid,  Typography } from '@mui/material';


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

const UserBlog = () => {
  const [blog, setBlog] = useState()

  const url = window.location.href
  const lastsegment = Number(url.split("/").pop())

  useEffect(() => {
    axios.post("http://localhost:3001/getsingleblog",
      { blogId: lastsegment }
    ).then((response) => {
      setBlog(response.data);
    });
  }, [lastsegment])

  return (
    <div >
      {blog && blog.length > 0 && blog.map((blog, idx) => (

        <div key={idx} className='text-center' style={{margin: '7rem auto', width: "80%"}} >
          <Grid container spacing={2}>
            <Grid>
              <Box >
                <img src={ `/images/${JSON.parse(blog.pic)[0]}`} alt="" style={{ height: '300px', width: '80%', zIndex: -1 , borderRadius: '12px'}} />
              </Box>
              <Box sx={{ mt: 4 }}>
                <Heading>
                  {blog.title}
                </Heading>
                <Text>
                  {blog.description}
                </Text>
              </Box>
            </Grid>
            
          </Grid>
        </div>
      ))}
    </div>
  )
}

export default UserBlog