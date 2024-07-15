import express from "express";
import { getAllUser,signup,login } from "../controller/user-controller.js";
const userRouter = express. Router();

//  route : /api/user/
userRouter.get("/", getAllUser);
userRouter.post("/signup",signup).post("/login",login);

export default userRouter