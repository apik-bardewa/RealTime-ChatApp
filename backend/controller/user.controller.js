import User from "../models/user.model.js";

export const getCurrentuser = async(req,res)=>{
    try {
        let userId = req.userId;
        let user = await User.findById({userId}).select("-password")
        if(!user){
            return res.status(400).json({msg:"user not found"})
        }
        return res.status(200).json({msg:`current user ${user}`});
    } catch (error) {
        return res.status(500).json({msg:`error detected in getcurrent logic ${error}`})

    }
}

export default getCurrentuser;