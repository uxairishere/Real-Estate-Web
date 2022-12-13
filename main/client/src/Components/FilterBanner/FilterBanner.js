import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { div, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import './FilterBanner.css'
import Posts from '../Posts/Posts'
import Blogs from '../Blogs/Blogs'
import AiIntro from './AiIntro'

const FilterBanner = () => {

    const [posts, setPosts] = useState()
    const [filterPost, setFilterPost] = useState()
    const [type, setType] = React.useState('');
    const [purpose, setPurpose] = React.useState('');

    const handleTypeChange = (event) => {
        setType(event.target.value)
    }
    const handlePurposeChange = (event) => {
        setPurpose(event.target.value)
    }

    useEffect(() => {
        axios.get("http://localhost:3001/getposts").then((response) => {
            setPosts(response.data);
            setFilterPost(response.data)
        });
    }, [])

    const filterType = (array) => {
        if (type !== '') {
            return array?.filter(post => post.type === type)
        }
        return array
    }

    const filterPurpose = (array) => {
        if (purpose !== '') {
            return array?.filter(post => post.purpose === purpose)
        }
        return array
    }
    useEffect(() => {
        setFilterPost(posts)
    }, [type, purpose])

    const handleFilter = () => {
        let result = filterPost
        result = filterType(result)
        result = filterPurpose(result)
        setFilterPost(result)
    }

    const handleResetFilter = () => {
        setType('')
        setPurpose('')
    }

    return (
        <>
            <div className="banner" >
                <div className='banner-container'>
                    <div className="banner-content row">

                        <div className='col-md-6'>
                            <h1 className='homeh1'>Search properties for sale in Pakistan</h1>
                        </div>

                        <div className='col-md-6 home-forms'>
                            <FormControl >
                                <InputLabel className='input-labels' id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    className="home-inputs"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label="Age"
                                    onChange={handleTypeChange}

                                >
                                    <MenuItem value={'plot'}>Plot</MenuItem>
                                    <MenuItem value={'house'}>House</MenuItem>
                                    <MenuItem value={'flat'}>Flat</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl >
                                <InputLabel className='input-labels' id="demo-simple-select-label">Purpose</InputLabel>
                                <Select
                                    className="home-inputs"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={purpose}
                                    label="Age"
                                    onChange={handlePurposeChange}
                                >
                                    <MenuItem value={'rent'}>Rent</MenuItem>
                                    <MenuItem value={'sale'}>Sale</MenuItem>
                                </Select>
                            </FormControl>
                            <a className='home-buttons btn btn-success m-2' href='#filter_posts' onClick={handleFilter}>Search</a>
                            <button className='home-buttons btn btn-info m-2' onClick={handleResetFilter}>Reset Filters</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='services-container'>
                <h1 className='text-center'>Services we provide</h1>

                <div className='services-wrapper row text-center'>

                    <div className='services-div col-md-3'>
                        <i style={{ fontSize: '5rem' }} className='fa fa-home gradient-text'></i>
                        <h3 className='gradiant-text'>Find Plots on Blogs</h3>
                        <p>Get latest prices from the blogs property dealers and owners post</p>
                    </div>
                    <div className='services-div col-md-3'>
                        <i style={{ fontSize: '5rem' }} className='fa fa-flag gradient-text'></i>
                        <h3 className='gradiant-text serviceh1'>Find Plots on Blogs</h3>
                        <p>Get latest prices from the blogs property dealers and owners post</p>
                    </div>
                    <div className='services-div col-md-3'>
                        <i style={{ fontSize: '5rem' }} className='fa fa-laptop gradient-text'></i>
                        <h3 className='gradiant-text'>Find Plots on Blogs</h3>
                        <p>Get latest prices from the blogs property dealers and owners post</p>
                    </div>
                    <div className='services-div col-md-7'>
                        <i style={{ fontSize: '5rem' }} className='fa fa-comment gradient-text'></i>
                        <h3 className='gradiant-text'>Get Assistance from Our Ai</h3>
                        <p>Get quicl assistance from out Powerful chatbot for your queries and help</p>
                    </div>
                    <div className='services-div col-md-3'>
                        <i style={{ fontSize: '5rem' }} className='fa fa-laptop gradient-text'></i>
                        <h3 className='gradiant-text'>Secure Browsing</h3>
                        <p>Powerful chatbot for your queries and help</p>
                    </div>
                </div>
                <div id="filter_posts">
                <Posts  posts={filterPost} />
                </div>

                <Blogs />
                <AiIntro/>

            </div>
        </>
    )
}

export default FilterBanner