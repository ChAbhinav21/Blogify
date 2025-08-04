// app.js(index.js)
require("dotenv").config()
const express = require('express');
const app =   express();
PORT =  process.env.PORT || 8000;
const path = require('path')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser') 
const session = require('express-session');
const  Blog = require('./models/blog')
const blogRouter = require('./Routes/blogroute')
const userRoute = require("./Routes/userrouter")


const {checkforAuthCookie }= require('./middleware/authentication')
// mongoose.connect('mongodb://localhost:27017/blogify')
mongoose.connect(process.env.MONGO_URL)
.then((e)=>console.log('mongoose connected sucessfully'))
app.set("view engine","ejs");
app.set("views",path.resolve("views"))

// midddleWares
app.use(cookieparser())
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat', // use strong secret in production
  resave: false,
  saveUninitialized: true
}));

console.log("My name is",process.env.myname);//environment variable are nothing but dynamic variables
app.use(express.static(path.resolve('./public')))//by default expressdo not serve static routes(Cannot GET /uploads/1754048223639-Ayyappa.jpg) by this it will allow opening images in uploads
app.use(checkforAuthCookie)/* it always checks weather token exists or not */
app.use('/user',userRoute)
app.use('/blog',blogRouter)

app.get('/',async (req,res)=>{
   const allBlogs = await Blog.find({});
    res.render('home',{
      user:req.user, /* when user login  user is req.user else null*/
       blogs:allBlogs,
    })
})

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Serveer startd sucessfully on ${PORT}`);
})
 