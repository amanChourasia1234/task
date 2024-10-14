import { DataTypes } from "sequelize";

import  sequelize  from "../config.js";

const Task = sequelize.define("task",{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
    },
    completed:{
        type:DataTypes.BOOLEAN
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

export default Task;