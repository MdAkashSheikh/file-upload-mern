require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')
const imageSc = require('./user.model')

const app = express()

const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(process.env.DB_CONN)
.then(()=> console.log('Database connected...'))
.catch(err=> console.log(err))

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('photo')

app.post('/upload', (req, res)=>{
    upload(req, res, (err)=> {
        if(err) {
            console.log(err)
        }
        else{
            const newImage = new imageSc({
                photo: {
                    data: req.file.photo,
                    contentType: 'image/png'
                }
            })
            newImage.save()
            .then(()=> res.send('Successfully Uploaded'))
            .catch((err) => console.log(err))
        }
    })
})

app.listen(port, ()=> {
    console.log(`Listening on port ${port}...`)
})