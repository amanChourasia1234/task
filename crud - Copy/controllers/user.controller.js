import { where } from "sequelize";
import User from "../models/user.model.js"
import Task from "../models/task.model.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken"

User.hasMany(Task);
 
//USER CONTROLLER
const register = async(req,res)=>{
     
        const {username , password, email,role} = req.body;
        if(role !== 'manager' && role !== 'user'){
            res.status(400).json({msg:"Role can be manager or User"});
        }
        const existedUsername = await User.findOne({
            where:{
                username:username
            }
        })
        if(existedUsername){
            res.status(400).json({msg:"Username already exists"})
        }
        const existEmail = await User.findOne({
            where:{
                email:email
            }
        })
        if(existEmail){
            res.status(400).json({msg:"Email already Exist"})
        }
        
        const encryptedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            username,
            password:encryptedPassword,
            email,
            role
        }).then((result)=>{
            res.json({
                status:200,
                result
            });
        }).catch(err=>{
            console.log(err);
        })
        
};
const login = async(req,res)=>{
    const {username,password} = req.body;

    const user =await User.findOne({
        where:{
            username:username,
        }
    })
    if(!user){
        res.status(400).json({msg:"User Not Found"})
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        res.status(400).json({msg:"Invalid Password"})
    }

    try {
        const token = jwt.sign(
            {
                id:user.id
            },
            "ACCESS_TOKEN_SECRET",
            {
                expiresIn: '1h'
            }
        )
        res.status(200).json({
            msg:"login Successfully",
            token
        });
    } catch (error) {
        console.log(error)
    }

}

const updateUser = async(req,res)=>{
    if(req.user.role !== 'manager'){
        res.status(400).json({msg:"Only Manager can Update task"})
    }
    let userId = req.params.id;
    
    const updatedUser = await User.update(req.body,{where:{id:userId}}).then((result)=>{
        res.json({
            status:200,
            result
        })
    }).catch(err=>{
        res.status(400).json({
            msg:err
        })
    })
}
const deleteUser = async(req,res)=>{
    if(req.user.role !== 'manager'){
        res.status(400).json({msg:"Only Manager can Update task"})
    }
    const userId = req.params.id;
    await User.destroy({
        where:{
            id:userId
        }
    }).then((result)=>{
        res.json({
            status:200,
            result
        })
    }).catch(err=>{
        res.json({
            status:200,
            err
        })
    })
}

const getDetail = async(req,res)=>{

    
    if(req.user.role === 'manager'){
        const user = await User.findAll({
            include:[
                {
                    model:Task
                }
            ]
        }).then(result=>{
            res.json(result)
        }).catch(err=>{
            console.log(err);
        })
    }else{
        const user = await User.findOne({
            where:{
                id:req.user.id
            },
            include:[
                {
                    model:Task
                }
            ]
        }).then(result=>{
            res.json(result)
        }).catch(err=>{
            console.log(err);
        })
    }   
    
    
  
};





export {
    register,
    login,
    getDetail,
    updateUser,
    deleteUser,
};