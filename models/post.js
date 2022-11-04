const Sequelize = require("sequelize");
const sequelize = require("../util/database");


const Employee = sequelize.define('employee',{
  id: {
    type: Sequelize.INTEGER,
    defaultValue:0,
    autoIncrementIdentity: true,
    allowNull: false,
    primaryKey: true
  },
  employeeName:{
    type:Sequelize.STRING,
    allowNull: true,
    
  },
  employeeUniqueNum:{
    type:Sequelize.INTEGER,
    allowNull: true,
    
  },
  noOfLeaves:{
    type:Sequelize.STRING,
    allowNull: true,
    defaultValue:10
  },
  delete:{
    type:Sequelize.BOOLEAN,
    defaultValue:false,
    allowNull: true
    
  }
}) 
  
module.exports=Employee;