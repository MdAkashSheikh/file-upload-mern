const mongoose = require('mongoose')

const imageSc = new mongoose.Schema({
    photo: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('PhotoUp', imageSc)