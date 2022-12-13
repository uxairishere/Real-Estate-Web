import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, TextField, Typography, LinearProgress, TextareaAutosize } from '@mui/material'

import coverblog from '../assets/cover4.jpg';

const AddUserBlog = () => {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
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

    if (title && description && selectedFile) {
      const data = new FormData()
      for (let i = 0; i < selectedFile.length; i++) {
        data.append('files', selectedFile[i]);
      }

      axios.post("http://localhost:3001/uploadmulterimages", data, options)
        .then(res => {
          setMultipleProgress(100);
          uploadFileToDB(res.data)
          // alert("image added")
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
      axios.post("http://localhost:3001/addblog", {
        title: title,
        description: description,
        pics: pics,
        firstname: user.firstname,
        lastname: user.lastname
      }).then((response) => {
        if (response.data.affectedRows > 0) {
          // alert("Data Updated")
          navigate("/", { replace: true })
          setSelectedFile()
        } else {
          alert("Data can not be updated")
        }
      }
      )
    } catch (err) {
      console.lof(err)
    }
  }


  return (
    <div className='addblog-container'>
      <div className='addblog-wrapper row'>
        <div className='col-md-7'>
          <Box sx={{ px: 5, my: 5 }}>
            <Typography component="h1" variant="h5">
              Post a Blog
            </Typography>
            <form style={{ mt: 1 }} encType="multipart/form-data" >
            <Box className='text-center'>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                  accept="image/*"
                  className='file-input__input'
                  name="file-input"
                  id="file-input"
                />
                <p>Add a cover</p>
                 <label class="file-input__label" for="file-input">+</label>
              </Box>
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
              <TextareaAutosize
                aria-label="descrition field"
                minRows={10}
                placeholder="Description *"
                style={{ width: '100%' }}
                onChange={(e) => { setDescription(e.target.value) }}
              />
              {multipleProgress > 0 && (
                <Box>
                  <LinearProgress value={multipleProgress} />
                </Box>
              )}
              <button
                type="submit"
                style={{width: '100%', borderRadius: '30px', padding: '1rem 0'}}
                className="btn btn-dark"
                onClick={(e) => handleSubmit(e)}
              >
                Post
              </button>
            </form>
          </Box>
        </div>

        {/* cover  */}
        <div className='col-md-5 addblog-cover'>
        </div>

      </div>
    </div>
  )
}

export default AddUserBlog