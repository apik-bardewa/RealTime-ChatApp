import Conversation from "../models/conversation.model.js";
import Message from "../models/messege.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import { getIo, userSocketMap } from "../socket.js";  // ✅ no more circular import

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

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
      getIo().to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);

  } catch (error) {
    console.error("sendMessage error:", error.message);
    res.status(500).json({ msg: `chat error occurred: ${error.message}` });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.receiver;

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