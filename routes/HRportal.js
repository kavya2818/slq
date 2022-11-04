const express = require("express");
const {body}=require('express-validator');
const HRportalController =require('../controllers/HRportal');
const Auth = require('../middleware/is-auth');

const router = express.Router();

router.post('/create',
 Auth,
[
  body('employeeName').trim().isLength({min:5}),
  body('employeeUniquNum').trim().isLength({min:5}),
],

HRportalController.addEmployee);

router.get("/fetchEmployee",
// Auth,
HRportalController.getEmployee);

router.patch('/update/:employeeId',[
  body('employeeName').trim().isLength({min:5}),
  body('employeeUniquNum').trim().isLength({min:5}),
],HRportalController.updateEmployee);

router.delete('/delete/:employeeId'
// ,Auth
,HRportalController.deleteEmployee)

module.exports = router;
