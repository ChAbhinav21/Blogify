// Routes/blogroute.js
const { Router } = require('express');
const router = Router();
const path = require('path');
const multer = require('multer')
const Blog = require('../models/blog')
const Comment = require('../models/comment')


const storage = multer.diskStorage({
     destination :function(req,file,cb){
       cb(null,path.resolve(`./public/uploads`))
     },
     filename: function(req,file,cb){
        const unique = Date.now();
 
// const fileExtension = path.extname(file.originalname);
        // const fileFormate = file.originalname.split(".")[1]
        // cb(null,file.fieldname+'-'+unique+'.'+fileFormate) 
          //or
        cb(null,unique+'-'+file.originalname);
     }
}); 

const upload = multer({storage:storage})

router.get('/add-new',(req,res)=>{
    return res.render("addBlog",{user:req.user})
})
router.get('/:id',async (req,res)=>{
   
   const blog = await Blog.findById(req.params.id).populate("createdBy")
   const comments = await Comment.find({blogId:req.params.id}).populate("createdBy")
   console.log(comments)
   res.render("blog",{
      user:req.user,
      blog,
      comments
   });
})
router.post('/',upload.single("coverImage"),async (req,res)=>{
 const { title,body} = req.body
 const blog = await Blog.create({
    body,
    title,
    createdBy:req.user._id,
    coverImage:`uploads/${req.file.filename}`
 })
  return res.redirect( `/blog/${blog._id}`);

})
router.post('/comment/:blogId',async (req,res)=>{
  await Comment.create({
   Content:req.body.Content,
   blogId:req.params.blogId,
   createdBy:req.user._id
  })
  return res.redirect(`/blog/${req.params.blogId}`)
})
module.exports=router