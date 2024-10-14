import { Sequelize } from "sequelize";


const sequelize = new Sequelize(
    "crud",
    "amanc",
    "amanc",
     {
       host: "localhost",
       dialect: 'mysql'
     }
);

export default sequelize;