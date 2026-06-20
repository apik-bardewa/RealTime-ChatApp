import mongoose from "mongoose";

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