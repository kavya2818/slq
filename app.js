const express = require("express")
const bodyParser = require('body-parser')
const sequelize= require('./util/database')
const morgan = require('morgan');

const HRportalRoutes = require("./routes/HRportal");
const userRoutes = require("./routes/user");
const authCont =require("./middleware/is-auth");

const Employee = require('./models/post');
const User = require('./models/user');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Content-Type,Accept,Authorization');
  if(req.method==="OPTION"){
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    return res.status(200).json({});
  }
  next();
})
app.use('/HRportal',HRportalRoutes);
app.use('/user',userRoutes);

app.use((error,req, res, next)=>{
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message:message, data:data});
});

Employee.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
User.hasMany(Employee);


sequelize.sync({force:true})
.then(result=>{
  console.log("connected")
 app.listen(7000);
})
.catch(err=>console.log(err));
