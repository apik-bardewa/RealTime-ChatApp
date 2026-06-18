import mongoose from "mongoose";
import User from "./user.model";
import message from "./messege.model";

const conversationSchema = new mongoose.Schema({
    participant:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    ],
    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'message'
        }
    ]  
},{timestamps:true})

const Conversation = mongoose.model("Conversation",conversationSchema)
export default Conversation;