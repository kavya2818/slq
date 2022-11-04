const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getSignUp=(req,res,next)=>{
  res.status(200).json({
      message:"Enter email,name and password"
  });
};

exports.register = (req, res, next)=>{
    const email=req.body.email;
    const password=req.body.password;
  bcrypt.hash(password,12)
  .then(hashPass=>{
      User.create({
          
          email:email,
          password:hashPass
      })
          .then(result=>{
              // console.log(result);
          })
          .catch(err=>{
              if(!err.statusCode){
                  err.statusCode=500;
              }
              next(err);
          })
  })
  .catch(err=>{
      if(!err.statusCode){
          err.statusCode=500;
      }
      next(err);
  });

res.status(200).json({
  email:email,

  password:password
});
};

exports.login = (req, res, next)=>{
  const loggedUsers=require("../middleware/loggedUsers");
    const tokens=loggedUsers.tokens;
    const users=loggedUsers.users;

    const email=req.body.email;
    const password=req.body.password;
    let loadUser;
    User.findOne({where:{email:email}})
        .then((user)=>{
            if(!user){
                const err=new Error("Email ID doesn't exist");
                err.statusCode=401;
                throw err;
            }
            
            if(users.includes(user.email)){
                const err=new Error("Already Logged IN");
                err.statusCode=401;
                throw err;
            }
            loadUser=user;
            users.push(user.email);
            // console.log(bycrypt.compare(loadUser.password,password));
            return bcrypt.compareSync(password,loadUser.password);
        })
        .then(isEqual=>{
            console.log(isEqual);
            if(!isEqual){
                const err=new Error("Wrong Password");
                err.statusCode=401;
                throw err;
            }
            const token=jwt.sign(
                {
                    email:loadUser.email,
                    userId:loadUser.id
                },"restricted",
                {expiresIn:"1h"}
            );
            tokens.push(token);
            res.status(200).json(
            {
                token:token,
                userId:loadUser.id.toString()
            });
            // res.status(200).redirect("/");
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        })
};
//   User.findOne({email:req.body.email})
//   .exec()
//   .then(user=>{
//     if (user.length < 1){
//       return res.status(401).json({
//         message:'Auth failed'
//       })
//     }
//     bcrypt.compare(req.body.password,user[0].password,(err, result)=>{
//       if(err){
//         return res.status(401).json({
//           message: 'Auth failed'
//         })
//       }
//       if(result){
//         const token=jwt.sign({
//           email:user[0].email,
//           userId: user[0]._id
//         },
//         "ristricted",
//           {expiresIn:'9h'})
//         return res.status(200).json({
//           message:'Auth successful',
//           token:token
//         })
//       }
//       res.status(401).json({
//         message: 'Auth failed'
//       });
//     });
//   })
//   .catch(err=>{
//     console.log(err);
//     res.status(500).json({
//       error:err
//     })
//    })
// }

exports.logout=(req, res, next) => {
  const postId=req.params.postId;
  User.findById(postId)
  .then(posts=>{
    res.status(200).json({message:'logout successfully',posts:posts});
})
.catch(err=>{
  if(!err.statusCode){
    err.statusCode=500;
  }
  next(err);
});
}






