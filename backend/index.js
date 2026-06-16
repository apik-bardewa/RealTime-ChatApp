import express from 'express';
import dotenv from "dotenv"
import connectDb from './config/db.js';
import dns from 'dns'
import authRouter from './routes/auth.router.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRouter from './routes/user.router.js';
import errorHandler from './middleware/error.middleware.js';
import rateLimit from 'express-rate-limit'


dns.setServers(["1.1.1.1","8.8.8.8"])

dotenv.config()
const app = express();
const port= process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	message:"To many request from your ip,try again later" 
})

app.use(limiter)

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.get("/",(req,res)=>{
    res.send("hello guuys")
})

app.use(errorHandler);
app.listen(port,()=>{
    console.log("server is listening at port",port);
    connectDb();
})