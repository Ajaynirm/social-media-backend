import express from 'express';
import bodyParser from 'body-parser';
import startServer from '../database/connectDB.js';
import userRouter from '../routes/userRoutes.js';
import blogRouter from '../routes/blogRoutes.js';



const app= express();
const port= 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//using routes in route module
//http://localhost:3000/api/user/
app.use('/api/user/',userRouter);
app.use('/api/blog/',blogRouter);


//starting mongodb server
startServer();
app.listen(3000, () => {
    console.log('app listening on port');
});