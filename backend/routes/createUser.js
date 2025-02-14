const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/createUser',async  (req, res) => {
  try{
     await User.create({
      // name : "Adithya",
      // email : "adithya@hotmail.com",
      // password : "adithya123",
      // location : "Bangalore"
      name : req.body.name, 
      email : req.body.email,
      password : req.body.password,
      location : req.body.location
     })

     res.json({message : "User created successfully"});
  }
  catch{
    console.log("Error in creating user");
    res.json({message : "User creation failed"});
  }
});

module.exports = router;