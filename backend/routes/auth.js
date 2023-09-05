   const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET='Riyaisagoodg$rl'; 

// Create a User using: POST "/api/auth/". No login required
router.post('/', [
  body('name', 'Enter a valid name of at least 3 characters').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must contain at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Creating a new User.
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    const user = new User({
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
    await user.save();
    // res.json(user);
    res.json({authtoken})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error!' });
  }
});

// Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email, password}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Please try to login with correct credentials"});
    }

const passwordCompare=await bcrypt.compare(password,user.password);
if(!passwordCompare){
  return res.status(400).json({error:"Please try to login with correct credentials"});
}
const data={
  user:{
    id:user.id
  }
}
    const authtoken=jwt.sign(data,JWT_SECRET);
    await user.save();
    // res.json(user);
    res.json({authtoken})
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error!' });
  }
});
module.exports = router;
