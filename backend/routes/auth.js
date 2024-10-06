const express = require('express');
const { body } = require('express-validator/check');


const db=require('../models')
const authController = require('../controllers/auth');

const router = express.Router();

// const User=db.user

const User=require("../models/user")

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        console.log("Checking email:", value)
        return User.find({ email: value }).then(userDoc => {
          console.log(userDoc,"userdocccc")
          if (userDoc.length > 0) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 6 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
