import mongoose from "mongoose";

//const schema=new mongoose.Schema();

const userSchema = new mongoose.Schema ({
    name : {
        type: 'String',
        required:true
    },
    email: {
        type: 'String',
        required:true,
        unique:true
    },
    password:{
        type:'String',
        requires : true,
        minlength:6
    },
    blog:[{
    type: mongoose.Types.ObjectId,
    ref: "Blog",
    
    }
    ]
});

export default mongoose.model('User',userSchema);
