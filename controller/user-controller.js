import User from "../model/User.js";
import bcrypt from 'bcryptjs';


//  route : /api/user/
 const getAllUser = async (req, res, next) => {
    let userList;
    try {
    userList = await User.find();
    } catch (err) {
    console.log(err);
    }
    if (!userList) {
    return res.status(404).json({ message: "No Users Found" });
    }
    return res.status (200).json({userList})

    }

    //  route : /api/user/signup
    const signup = async (req,res,next) => {
      const {name,email,password} =req.body;
        let existingUser;
        try{
         //in es6 we can use same name 
         existingUser = await User.findOne({email});
        }catch(error){
         console.log(error);
        }
        if(existingUser){
         return res.status(400).json({message: "user already exist , login instead"});
        }
        const hashedPassword = await bcrypt.hashSync(password);
      const user = new User({
         name,
         email,
         password:hashedPassword
      });
     
      try{
         await user.save();
      }catch(error){
         console.log(error);
      }
      return res.status(201).json(user);
    }

    //  route : /api/user/login                  

    const login = async (req,res,next) => {
      const {email,password}=req.body;
      let existingUser= await User.findOne({email});
      if(!existingUser){
         return res.status(401).json({message:'user not found'});
      }
      const checkPassword = await bcrypt.compareSync(password,existingUser.password);
      if(!checkPassword){
         return res.status(401).json({message:'Invalid password'});
      }
      return res.status(200).json({message:"login successfully"});
    }

    export  {getAllUser,signup,login};



    

