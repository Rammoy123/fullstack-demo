const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const db=require('../models')
const User=require("../models/user")

// const User=db.user
// const express = require('express');
// const app = express();

// app.use(bodyParser.json()); // For JSON bodies
// app.use(bodyParser.urlencoded({ extended: true }));


const SECRET_KEY = require('../constants');
// signup for user
exports.signup = async(req, res, next) => {
console.log(req.body,"bodyyy");
  // const error={}
  const errors = validationResult(req);
  console.log(errors,"errors")

  // If error validation failed, then responding with 422 code
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    // error.statusCode = 401;

    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  // Once validation succeeded, the proceed to server the request,
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
try{



  const encryptedPassword=await  bcrypt
.hash(password, 12)



const user=new User({
  email: email,
  password: encryptedPassword,
  name: name
});

const result=await user.save();
console.log(result,"result")
if(result){
  res.status(201).json({ message: 'User created!' })
}

}
catch(err){
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);

}


  
 
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let fetchedUser;
  User.findOne({ email: email,status:1 })
    .then(user => {
      if (!user) {
        const error = new Error('User does not exists!');
        error.statusCode = 401;
        throw error;
      }


      fetchedUser = user;

      return bcrypt.compare(password, fetchedUser.password);
    })
    .then(isEqual => {
      console.log(isEqual,"isqual")
      if (!isEqual) {
        const error = new Error('Wrong credentials!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id.toString()
        },
        SECRET_KEY, 
        { expiresIn: '1h' } //SETTING THE TOKEN EXPIRY 1h for now
      );
      console.log(token,"token")
      res.status(200).json({ token: token, useR: fetchedUser.email });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
