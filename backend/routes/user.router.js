import express from 'express';
import { getCurrentuser } from '../controller/user.controller.js';
import isAuth from '../middleware/isAuth.js';

const userRouter = express.Router();

userRouter.get("/current",isAuth,getCurrentuser)

export default userRouter;