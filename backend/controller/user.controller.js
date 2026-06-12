import User from "../models/user.model.js";


export const getCurrentuser = async (req, res) => {
    try {
        const userId = req.userId;
        console.log(userId);
        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            return res.status(400).json({ msg: "user not found" });
        }
        console.log("COOKIES:", req.cookies);
        console.log("HEADERS COOKIE:", req.headers.cookie);
        return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({
            msg: `error detected in getcurrent logic ${error.message}`
        });
    }
};
export default getCurrentuser;

export const updateProfile = async(req,res)=>{
     try {
        const file = req.body;
       const user = await users.findOne({ userid: userId });
    if (!user) {
      console.log('User not found');
      return;
    }
    console.log('Found user:', user);
    // Update user with new data
    const result = await users.updateOne(
      { userid: userId },
      { $set: file.data } // newData is an object with fields to update
    )
    } catch (err) {
        return res.status(500).json({msg:`error detected:${err}`});
    }
}