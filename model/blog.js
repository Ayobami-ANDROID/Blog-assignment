const mongoose = require('mongoose')

//my blog Schema
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Title is required']
    },
    content:{
       type:String,
       required:[true, 'Content is required']
    },
    author:{
        type:String,
        required:[true,'Author is required']
    },
    creationDate:{
     type:Date,
     default:Date.now()
    }
})

module.exports = mongoose.model('Blog', blogSchema)