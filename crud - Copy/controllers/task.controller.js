
import { where } from "sequelize";
import User from "../models/user.model.js"
import Task from "../models/task.model.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken"


User.hasMany(Task);
//TASK CONTROLLER
const createTask = async(req,res)=>{
    if(req.user.role !== 'manager'){
        res.status(400).json({msg:"Only manager can create task"})
    }
    const {title,description,completed,userId} = req.body;
    const createdTasks = await Task.create({title,description,completed,userId}).then((result)=>{
        res.json(result)
    }).catch(err=>{
       console.log(err)
    })
}
// const getTask = async(req,res)=>{
//     // const id = await User.addHook.findByPk
//     const tasks = await Task.findAll(
//         {
//             where:{
//                 id:req.user.id
//             }
//         }
//     ).then(result=>{
//         res.json({
//             status:200,
//             result
//         })
//     }).catch(err=>{
//         res.status(400).json({
//             msg:err
//         })
//     })
// }
const updateTask = async(req,res)=>{
    if(req.user.role !== 'manager'){
        res.status(200).json({msg:"Only Manager can update task"})
    }
    const taskId = req.params.id;
    const task = await Task.update(
        req.body,
        {
            where:{
            id:taskId
            }
        }
    ).then(result=>{
        res.json({
            status:200,
            result
        })
    }).catch(err=>{
        res.json({
            status:500,
            err
        })
    })
}
const deleteTask = async(req,res)=>{
    if(req.user.role !== 'manager'){
        res.status(400).json({msg:"Only Manager can delete task"})
    }
    const id = req.params.id;
    const task = await Task.findByPk(id);
    if(!task){
        return res.json({
            status:400,
            msg:"Task Not Found"
        })
    }
    await task.destroy().then(()=>{
        return res.json({
            status:200,
            msg:"task deleted successfully"
        })
    }).catch(err=>{
        console.log(err);
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
    createTask,
    updateTask,
    deleteTask,
    getDetail
}