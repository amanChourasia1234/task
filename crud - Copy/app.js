import express from "express";
import sequelize from "./config.js";
import bodyParser from "body-parser";
import router from "./routes/user.route.js";

const app = express();

app.use(bodyParser.json());

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

console.log(process.env.PORT)


const PORT =process.env.PORT ||  5000;


app.use('/',router);

sequelize.sync().then(()=>{
   app.listen(PORT ,()=>{
      console.log(`Server is running on port ${PORT}`);
 });
})
// app.post('/create-user',createUser);
// app.get('/',(req,res)=>{
//    res.send('home page');
// })