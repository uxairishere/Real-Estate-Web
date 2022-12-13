import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { Box, Button, TextField, Typography, LinearProgress, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio } from '@mui/material'





const AddUserPost = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [location, setLocation] = useState()
    const [demand, setDemand] = useState()
    const [type, setType] = useState("plot")
    const [purpose, setPurpose] = useState("rent")
    const [area, setArea] = useState()
    const [multipleProgress, setMultipleProgress] = useState(0);

    const user = JSON.parse(localStorage.getItem('estateUser'))


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files);
        setMultipleProgress(0);
    };

    const options = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setMultipleProgress(percentage);
        }
    }


    const handleSubmit = (e) => {

        e.preventDefault();

        if (title && description && location && demand && type && purpose && area && selectedFile) {
            const data = new FormData()
            for (let i = 0; i < selectedFile.length; i++) {
                data.append('files', selectedFile[i]);
            }

            axios.post("http://localhost:3001/uploadmulterimages", data, options)
                .then(res => {
                    setMultipleProgress(100);
                    uploadFileToDB(res.data)

                    setTimeout(() => {
                        setMultipleProgress(0);
                    }, 1000);
                })
                .catch(err => console.log(err))
        }
        else {
            alert("Please provide all information")
        }

    };



    const uploadFileToDB = (links) => {
        const pics = JSON.stringify(links)
        try {
            axios.post("http://localhost:3001/addpost", {
                title: title,
                description: description,
                location: location,
                demand: demand,
                type: type,
                purpose: purpose,
                area: area,
                pics: pics,
                firstname: user.firstname,
                lastname: user.lastname,
                number: user.number, 
                email: user.email
            }).then((response) => {
                if (response.data.affectedRows > 0) {
                    // alert("Data Updated")
                    setSelectedFile()
                    setTitle()
                    setDescription()
                } else {
                    alert("Data can not be updated")
                }
            }
            )
        } catch (err) {
            console.lof(err)
        }
    }

    console.log("EMAIL OF USER: " + user.email)

    return (
        <Box sx={{ px: 25, my: 5 }}>
            <Typography component="h1" variant="h5">
                Add a Post
            </Typography>
            <form style={{ mt: 1 }} encType="multipart/form-data" >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="text"
                    id="description"
                    onChange={(e) => { setDescription(e.target.value) }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="location"
                    label="Location"
                    type="text"
                    id="location"
                    onChange={(e) => { setLocation(e.target.value) }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="demand"
                    label="Demand in RS"
                    type="number"
                    id="demand"
                    onChange={(e) => { setDemand(e.target.value) }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="area"
                    label="Area in Sqft"
                    type="number"
                    id="area"
                    onChange={(e) => { setArea(e.target.value) }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Type</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={type}
                            onChange={(e) => { setType(e.target.value) }}
                        >
                            <FormControlLabel value="plot" control={<Radio />} label="Plot" />
                            <FormControlLabel value="house" control={<Radio />} label="House" />
                            <FormControlLabel value="flat" control={<Radio />} label="Flat" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Purpose</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={purpose}
                            onChange={(e) => { setPurpose(e.target.value) }}
                        >
                            <FormControlLabel value="rent" control={<Radio />} label="Rent" />
                            <FormControlLabel value="sale" control={<Radio />} label="Sale" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileChange(e)}
                        accept="image/*"
                    />
                </Box>
                {multipleProgress > 0 && (
                    <Box>
                        <LinearProgress value={multipleProgress} />
                    </Box>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={(e) => handleSubmit(e)}
                >
                    Insert
                </Button>
            </form>
        </Box>
    )
}

export default AddUserPost