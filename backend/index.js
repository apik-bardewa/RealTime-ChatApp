import express from 'express';
import dotenv from "dotenv"
import connectDb from './config/db.js';
import dns from 'dns'
import authRouter from './routes/auth.router.js';
import cookieParser from 'cookie-parser';

dns.setServers(["1.1.1.1","8.8.8.8"])

dotenv.config()
const app = express();
const port= process.env.PORT

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter)

app.get("/",(req,res)=>{
    res.send("hello guuys")
})

app.listen(port,()=>{
    console.log("server is listening at port",port);
    connectDb();
})