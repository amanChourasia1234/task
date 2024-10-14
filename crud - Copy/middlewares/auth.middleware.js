import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const verifyJWT =async (req,res,next)=>{


    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        if(!token){
            res.json({
                status:400,
                msg:"Token not provided"
            })
        }
    
        const decodedToken =  jwt.verify(token,'ACCESS_TOKEN_SECRET')
    
        const user = await User.findByPk(decodedToken.id);
        
        if(!user){
            res.status(400).json({msg:"User not found"})
        }
        
        req.user = user;
        next();
        
    } catch (error) {
        res.status(400).json({msg:error});
    }

}
export default verifyJWT;