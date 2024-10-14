import { Router } from "express";

import { register,login,getDetail,deleteUser,updateUser } from "../controllers/user.controller.js";
import { createTask,updateTask,deleteTask } from "../controllers/task.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = Router();

//USER CRUD OPERATION
router.route('/create-user').post(register);
router.route('/login').post(login);

router.route('/update-user/:id').put(verifyJWT,updateUser);
router.route('/delete-user/:id').delete(verifyJWT,deleteUser);


// // TASK CRUD OPERATIONS
router.route('/create-task').post(verifyJWT,createTask);
router.route('/get-task-detail').get(verifyJWT,getDetail);
// router.route('/get-task').get(verifyJWT,getTask);
router.route('/update-task/:id').put(verifyJWT,updateTask);
router.route('/delete-task/:id').delete(verifyJWT,deleteTask);



export default router;