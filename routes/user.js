const express = require('express');
const userController=require('../controllers/user')
const leaveController=require('../controllers/leave')
const Auth = require('../middleware/is-auth');
const User=require("../models/user");
const {body}=require("express-validator");

const router = express.Router();

router.get("/signup", userController.getSignUp);

router.post('/register',[
  body("email")
        .isEmail()
        .withMessage("!!Enter valid Email ID"),
    body("email")
        .custom(value=>{
            return User.findOne({where:{email:value}})
                .then(userDoc=>{
                    // console.log(userDoc);
                    if(userDoc!==null)
                        return Promise.reject("Email alredy Exist!!");
                })
        }),
        body("password")
            .trim()
            .isLength({min:5}),
],userController.register);

router.post('/login',userController.login);

router.get('/logout/:postId',userController.logout);

router.post('/leave/:postId',Auth,leaveController.leave);



module.exports = router;
