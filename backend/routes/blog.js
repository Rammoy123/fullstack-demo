const express = require('express');
const { body } = require('express-validator/check');

const blogController = require('../controllers/blog');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
const db=require('../models')
const User=db.user


const SECRET_KEY = require('../constants');

// GET /feed/posts
router.get('/all-blogs', isAuth, blogController.getAllBlog);

// POST /feed/post
console.log("innn")
router.post(
  '/post',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 1 }),
    body('content')
      .trim()
      .isLength({ min: 1 })
  ],
  blogController.createBlog
);
console.log("innnout")


router.get('/blog/:blogId', isAuth, blogController.getBlog);

router.put(
  '/update/:blogId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 1 }),
    body('content')
      .trim()
      .isLength({ min: 1 })
  ],
  blogController.updateBlog
);

router.delete('/delete/:blogId', isAuth, blogController.deleteBlog);

module.exports = router;
