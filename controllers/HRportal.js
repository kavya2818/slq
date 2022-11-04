const {validationResult} = require('express-validator');
const Employee = require('../models/post');

exports.addEmployee = (req, res, next)=>{
  const employeeName=req.body.employeeName;
  const employeeUniqueNum=req.body.employeeUniqueNum;

Employee.create({
    employeeName: employeeName, 
    employeeUniqueNum:employeeUniqueNum
  })

    .then(result => {
        console.log('Employee details created successfully!');
      })
    
    .catch(err => {
      if(!err.statusCode){
        err.statusCode=500;
      }
      next(err);
    });
  };


exports.getEmployee = (req,res,next)=>{
  const id=req.params.employeeId;
//   if(id===undefined || id===null){
//     const err=new Error("Enter ID");
//     err.statusCode=401;
//     throw err;
// }
  Employee.findAll({id},{delete:false})
  .then(Employee=>{
    if(!Employee){
    const err=new Error("employee doesn't Exist!");
    err.statusCode=401;
    throw err;
  }
    res.status(200).json({
      Employee:Employee
    });
  })
  .catch(err=>{
    if(!err.statusCode){
      err.statusCode=500;
    }
    next(err);
  });
};

exports.updateEmployee=(req,res,next)=>{
  const id=req.params.employeeId;
  if(id===undefined || id===null){
    const err=new Error("Enter ID");
    err.statusCode=401;
    throw err;
}
  const updatedemployeeName=req.body.employeeName;
  const updatedemployeeUniqueNum=req.body.employeeUniqueNum;

  // const updateOps = {};
  // for(const ops of req.body){
  //   updateOps[ops.propName]= ops.value;
  // }

Employee.findOne({_id:id},
  // {$set:updateOps}
  )
.then(Employee=>{
  if(!Employee){
      const err=new Error("Employee doesn't Exist!!");
      err.statusCode=401;
      throw err;
  }
    Employee.employeeName= updatedemployeeName;
    Employee.employeeUniqueNum=updatedemployeeUniqueNum;
    return Employee.save();
})

.then(result=>{
  console.log("updated Successfully");
  res.status(200).redirect("/");
})
.catch(err=>{
  if(!err.statusCode){
    err.statusCode=500;
  }
  next(err);
})
};

exports.deleteEmployee=(req,res,next)=>{
  const id=req.body.employeeId;
    Employee.findOne(id)
    .then (employee=>{
      if(!employee.delete){
        employee.delete=true
      }
      return employee.save();
    })
    .then(result=>{
        console.log("Deleted Successfully");
        //res.status(200).redirect("/");
    })
    .catch(err=>
        console.log(err));
};