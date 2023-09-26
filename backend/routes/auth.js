  const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET='Riyaisagoodg$rl'; 

// ROUTE 1: Create a User using: POST "/api/auth/". No login required
router.post('/', [
  body('name', 'Enter a valid name of at least 3 characters').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must contain at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success=false;
    return res.status(400).json({ success, errors: errors.array()  });
  }

  try {
    // Check whether the user with this email exists already
    let user=await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
    // Creating a new User.
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

     user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
const data={
  user:{
    id:user.id
  }
}
    const authtoken=jwt.sign(data,JWT_SECRET);
   // console.log(jwtData);
    //await user.save();
    // res.json(user);
    res.json({authtoken})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error!' });
  }
});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
 let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success=false;
    return res.status(400).json({ success, errors: errors.array() });
  }
  const {email, password}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
       success=false;
      return res.status(400).json({success, error:"Please try to login with correct credentials"});
    }

const passwordCompare=await bcrypt.compare(password,user.password);
if(!passwordCompare){
  success=false;
  return res.status(400).json({success, error:"Please try to login with correct credentials"});
}
const data={
  user:{
    id:user.id
  }
}
    const authtoken=jwt.sign(data,JWT_SECRET);
    await user.save();
    // res.json(user);
    success=true;
    res.json({success,authtoken})
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error!' });
  }
});

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async (req, res) => {
try{
userId=req.user.id;
const user=await User.findById(userId).select("-password")
res.send(user)
}
catch(error){
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error!' });
}
});
module.exports = router;
