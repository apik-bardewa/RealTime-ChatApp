const errorHandler = (err,req,res,next)=>{
    let status = err.status || 500;
     let message = err.message || "Backend error"
    let extraInfo = err.extraInfo  || "error is deteced in server side"
   
    return res.status(status).json({message,extraInfo});    
}

export default errorHandler;