import Conversation from "../models/conversation.model.js";
import Message from "../models/messege.model.js";  // ✅ keep your existing filename
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import { io, userSocketMap } from "../index.js";   // ✅ add this for socket

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    // ✅ await was missing here
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    let conversation = await Conversation.findOne({
      participant: { $all: [sender, receiver] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participant: [sender, receiver],
        message: [newMessage._id],
      });
    } else {
      conversation.message.push(newMessage._id);
      await conversation.save();
    }

    // ✅ emit to receiver if they're online
    const receiverSocketId = userSocketMap[receiver];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // ✅ res.send(201) was wrong — should be res.status(201)
    res.status(201).json(newMessage);

  } catch (error) {
    res.status(500).json({ msg: `chat error occurred: ${error.message}` });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.receiver;   // ✅ was req.params.id, now matches /:receiver

    const conversation = await Conversation.findOne({
      participant: { $all: [senderId, receiverId] },
    }).populate("message");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.message);

  } catch (error) {
    console.error("getMessages error:", error);
    res.status(500).json({ msg: error.message });
  }
};

export const sendData = async (req, res) => {
  try {
    const { enteremail } = req.body;

    const user = await User.findOne({ email: enteremail });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("sendData error:", error);
    res.status(500).json({ msg: `Error: ${error.message}` });
  }
};


// import Conversation from "../models/conversation.model.js";
// import Message from "../models/messege.model.js";
// import uploadOnCloudinary from "../config/cloudinary.js";
// import User from "../models/user.model.js";
// export const sendMessage=async (req,res)=>{
//     try {
//         const sender= req.userId;
//         const {receiver} = req.params;
//         const {message}= req.body;
//         let image;
//         if(req.file){
//             image = await uploadOnCloudinary(req.file.path)
//         }
//         //new chat or older chat checking
//         let conversation = await Conversation.findOne({
//             participant:{$all:[sender,receiver]}
//         })

//         let newMessage = Message.create({
//             sender,receiver,message,image
//         })
        
//         if(!conversation){
//            conversation = await Conversation.create({
//             participant:[sender,receiver],
//             message:[newMessage._id]
//            })
//         }else{
//              conversation.message.push(newMessage._id);
//             await conversation.save()
//         };
//         res.send(201).json(newMessage);



//     } catch (error) {
//         res.send(500).json({msg:`chat error occured ${error}`});
//     }
// }



// export const getMessages = async (req, res) => {
//   try {
//     const senderId = req.userId;          // from isAuth
//     const receiverId = req.params.id;     // selected user's _id

//     // Find conversation where both users are participants
//     const conversation = await Conversation.findOne({
//       participant: { $all: [senderId, receiverId] }
//     }).populate("message");

//     if (!conversation) {
//       return res.status(200).json([]); // no messages yet, return empty
//     }

//     res.status(200).json(conversation.message);

//   } catch (error) {
//     console.error("getMessages error:", error);
//     res.status(500).json({ msg: error.message });
//   }
// };

// export const sendData = async (req, res) => {
//   try {
//     const { enteremail } = req.body;

//     const user = await User.findOne({ email: enteremail });

//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }

//     // ✅ req.userId set by your isAuth middleware
//     // if (user._id.toString() === req.userId.toString()) {
//     //   return res.status(400).json({ msg: "You cannot add yourself" });
//     // }

//     res.status(200).json(user);

//   } catch (error) {
//     console.error("sendData error:", error);
//     res.status(500).json({ msg: `Error: ${error.message}` });
//   }
// };