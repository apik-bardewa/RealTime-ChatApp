import express from 'express';
import { login, logout, signup } from '../controller/auth.controller.js';

const authRouter = express.Router();
authRouter.post("/signup",signup);
authRouter.post("/signin",login);
authRouter.get("/signout",logout)


export default authRouter;