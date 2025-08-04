// models/blog.js
const {Schema, model }= require('mongoose') 
const blogSchmea = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
          type:String,
        required:true
     
    },
    coverImage:{
          type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }


},{timestamps:true})
const Blog = model("blog",blogSchmea);

module.exports =Blog