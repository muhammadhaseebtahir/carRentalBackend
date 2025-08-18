const jwt = require("jsonwebtoken")

require("dotenv").config()

const verifyToken =(req,res,next)=>{

    const authHeader = req.headers.authorization
    if(!authHeader){
        return  res.status(401).json({status:"Failed",message:"Access Denied"})
    }

    const token = authHeader.split(" ")[1]
    jwt.verify(token,process.env.SECRET_KEY,(err,result)=>{
        if(!err){
            req.user_Id=result.user_Id
        next()
        }else{
            return res.status(403).json({message:"Invalid token."})
        }

    })

}


module.exports= verifyToken

// const jwt = require("jsonwebtoken");
// require("dotenv").config();
//  const verifyToken =(req,res,next)=>{
//     const authHeader = req.headers.authorization
//     if(!authHeader){
//         return res.status(401).json({message:"Access Denied"})
//     }
//     const token = authHeader.split(" ")[1]
//         jwt.verify(token,process.env.JWT_SECRET,(err,result)=>{
//               if(!err){
//                 req.user_Id=result.user_Id
//                 next()
//             }else{
//                      return res.status(403).json({message:"Invalid token"})

//                  }          

//         })
//      }
//      module.exports=verifyToken;
