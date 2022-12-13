import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Posts from '../Posts/Posts';

const UserDashboard = () => {

  const [posts, setPosts] = useState()
  const user = JSON.parse(localStorage.getItem('estateUser'))


  useEffect(() => {
    axios.get("http://localhost:3001/getposts").then((response) => {
      const filteredData = response.data?.filter(post => post.number === user.number)
      setPosts(filteredData)
    });
  }, [])


  return (
    <div className='dashboard-container'>
      <div className='dash-admin-intro text-center' style={{padding: '7rem 0 0 0'}}>
        <div style={{backgroundColor: 'rgb(0, 128, 0 ,0.2)', width: '80%', margin: '0 auto', padding: '2rem 0'}}>
        <h1>{user.firstname} {user.lastname}</h1>
        {/* <p className='modal-numbers'>{user.firstname} {user.lastname}</p> */}
        <p className='modal-numbers'>{user.email}</p>
        <p className='modal-numbers'>{user.address}</p>
        <p className='modal-numbers'>{user.number}</p>
        </div>
      </div>
      <Posts posts={posts} />
    </div>
  )
}

export default UserDashboard