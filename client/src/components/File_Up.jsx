import React, { useState } from 'react'
import axios from 'axios'

export default function File_Up() {

    const [newUser, setNewUser] = useState({
        photo: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', newUser.photo)

        axios.post('http://localhost:5000/upload', formData)
        .then(res => {
            console.log(res)
        })
        .catch(err=> {
            console.log(err)
        });
    }

    const handlePhoto=(e)=> {
        setNewUser({...newUser, photo: e.target.files[0]})
    }


  return (
    <form onSubmit={(e)=> handleSubmit(e)} encType='multipart/form-data'>
        <input
            type='file'
            accept='.pmg, .jpg, .jpeg'
            name='photo'
            onChange={handlePhoto}
        />

        <input
            type='submit'
        />

    </form>
  )
}
