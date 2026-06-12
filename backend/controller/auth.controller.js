import genToken from "../config/token.js";
import User from "../models/user.model.js";
import cookieParser from "cookie-parser";
import bcrypt from 'bcryptjs'
export const signup= async(req,res)=>{
    try {
        // console.log(req.body);
        const {userName,email,password} = req.body;
        
        const checkexistuserName = await User.findOne({userName})
        if(checkexistuserName){
            return res.status(400).json({msg:"userName already exist"})
            console.log("right");
            
        }

        const checkexistemail = await User.findOne({email})
        if(checkexistemail){
            return res.status(400).json({msg:"email already exist"})
        }

        if(password.length<6){
            return res.status(400).json({msg:"password must be at leat 6 character"})
        }

        const hashPassword = await bcrypt.hash(password,10);

        const  user = await User.create({userName:userName,email:email,password:hashPassword});
        


        const token = await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            mazAge:7*24*60*60*1000,
            sameSite:"lax",
            secure:false
        })
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({msg:`server internal error logic is fine ${error}`})
    }
}





export const login= async(req,res)=>{
    try {
        const {email,password} = req.body;
        
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:"user Not exist please signup first"});
        }
        
        
        const isMatch =await bcrypt.compare(password,user.password);
         if(!isMatch){
            // return res.status(400).json({msg:"incorrect password"})
            let err = {
                status:400,
                message:"incorrec password or something went wroung",
                extraInfo:"password and email not matched"
            }
            next(err);
        }
        const token = await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            mazAge:7*24*60*60*1000,
            sameSite:"lax",
            secure:false
        })
        return res.status(200).json(user);
        
    } catch (error) {
        // return res.status(500).json({msg:`login error ${error}`})
        const err = {
            status :500,
            message: "login erorr",
            extraInfo: error.message
        }

        next(err);
    }
}


export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/"
    });

    return res.status(200).json({ msg: "user is logout successfully" });
};