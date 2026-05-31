import mongoose from "mongoose";
const connectDb=async ()=>{
      try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected successfully")
      }catch(err){
        console.log("db error detected",err);
      }
}

export default connectDb;