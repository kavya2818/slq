const {validationResult} = require('express-validator');
const Leave = require('../models/leave');
const post = require('../models/post');

exports.leave=(req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode=422;
    throw error;
  }
  const id =req.params.postId;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  const noOfLeaves= req.body.noOfLeaves;
  const newLeave = new Leave({
    start_date:start_date, 
    end_date:end_date, 
    noOfLeaves:noOfLeaves
  });
  newLeave
  .save()
  post.findOne({_id:id})
  .then(post=>{
    if(!post){
      const error = new Error('could not find.');
    error.statusCode=422;
    throw error;
    }
  post.noOfLeaves=Number(post.noOfLeaves)-noOfLeaves
  return post.save()

})
  
  .then(result => {
    res.status(201).json({
      message: 'leave applyed successfully',
      post: result
    });
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode=500;
    }
    next(err);
  });
}

