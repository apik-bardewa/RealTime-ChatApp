import jwt from "jsonwebtoken"
const genToken = async(userid)=>{
    try {
        const token = await jwt.sign({userid},process.env.JWT_SECRET,{expiresIn:"7d"
        })
        return token;
    } catch (error) {
        console.log("token generation error");
        return null;
    }
}
export default genToken;