import express from "express";
import { getMessages, sendMessage } from "../controller/message.controller.js";
import isAuth from "../middleware/isAuth.js";
import upload from '../middleware/multer.js';

const messageRoute = express.Router();

messageRoute.post('/:receiver', isAuth, upload.single("image"), sendMessage);  // ✅ removed /send/
messageRoute.get('/:receiver', isAuth, getMessages);                            // ✅ GET not POST, fixed param

export default messageRoute;