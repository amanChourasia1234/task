import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const User = sequelize.define("user",{
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:'user'

    }
});


export default User;