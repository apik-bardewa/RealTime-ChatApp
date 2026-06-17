import mongoose from "mongoose";
import User from "./user.model";

const conversationSchema = new mongoose.Schema({
    participant:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    ],
    message:[
        {type:String}
    ]
},{timestamps:true})
