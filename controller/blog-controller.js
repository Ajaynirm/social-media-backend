import mongoose from 'mongoose';
import Blog from '../model/Blog.js';
import User from '../model/User.js';

export const getAllBlog = async (req,res,next) => {
    let blog;
    try{
        blog = await Blog.find();
    }catch(e){
        console.log(e);
    }
  return res.status(201).json({blog});
}

export const addBlog = async (req,res,next) => {
    const {title,description,image,user}=req.body;
    //check user is exist or not
    let existingUser;
    try{
        existingUser =await User.findById(user);
    }catch(e){
        console.log(e);
    }
    if(!existingUser){
        return res.status(401).json({message: "Unable to find user by id"});
    }

    const blog= new Blog({
        title,
        description,
        image,
        user
    });
    try{
        //await blog.save();
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blog.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch(e){
        console.log(e);
    }
    res.status(201).json({blog});

}

export const updateBlog = async (req,res,next) => {
    const {title,description}=req.body;
    const id=req.params.id;
    let blog;

    try{
        blog= await Blog.findByIdAndUpdate(id,{
            title,
            description
        })
    }catch(e){
        console.log(e);
    }
    if(!blog){
        res.status(404).json({message:"Blog not updates"});
    }
    res.status(201).json({blog});
}
export const getBlogById = async (req,res,next) => {
    const id =req.params.id;
    let blog;
    try{
        blog= await Blog.findById(id);
    }catch(e){
        console.log(e);
    }
    if(!blog){
        res.status(404).json({message:"Blog not found"});
    }
    return res.status(201).json({blog});
}

export const deleteBlogById = async (req,res,next) => {
    const id = req.params.id;
    let blog;
    try{
       blog= await Blog.findByIdAndDelete(id).populate("user");
       await blog.user.blog.pull(blog);
       await blog.user.save();
    }catch(e){
        console.log(e);
    }
    if(!blog){
        res.status(404).json({message:"Unable to delete the blog"});
    }
    return res.status(201).json({message:"successfully deleted "});
}

export const getByUserId = async (req,res,next) => {
    const id=req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(id).populate("blog");
    }catch(e){
        console.log(e);
    }
    if(!userBlogs){
        res.status(404).json({message:"No blogs found"});
    }
    return res.status(201).json({blog:userBlogs});
}