import express from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js";
import isAuth from "../middleware/isAuth.js";
import upload from '../middleware/multer.js'
const messageRoute = express.Router()

messageRoute.post('/send/:receiver',isAuth,upload.single("image"),sendMessage)
messageRoute.post('/get/:receiver',isAuth,getMessage)

export default messageRoute;