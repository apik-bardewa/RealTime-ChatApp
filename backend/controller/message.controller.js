import uploadOnCloudinary from "../config/cloudinary";
import Conversation from "../models/conversation.model";
import Message from "../models/messege.model";

export const sendMessage=async (req,res)=>{
    try {
        const sender= req.userId;
        const {receiver} = req.params;
        const {message}= req.body;
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }
        //new chat or older chat checking
        let conversation = await Conversation.findOne({
            participant:{$all:[sender,receiver]}
        })

        let newMessage = Message.create({
            sender,receiver,message,image
        })
        
        if(!conversation){
           conversation = await Conversation.create({
            participant:[sender,receiver],
            message:[newMessage._id]
           })
        }else{
             conversation.message.push(newMessage._id);
            await conversation.save()
        };
        res.send(201).json(newMessage);



    } catch (error) {
        res.send(500).json({msg:`chat error occured ${error}`});
    }
}

export const getMessage = async(req,res)=>{
    try {
        let sender= req.userId;
        let {receiver} = req.params
        let conversation= await Conversation.findOne({participant:{$all:[sender,receiver]}}).populate("message")
        
        res.send(201).json(conversation?.message);
        if(!conversation){
            res.send(400).json({msg:"error occured to find chat "})
        }
    } catch (error) {
        res.send(500).json({msg:`get message error ${error}`});
    }
}