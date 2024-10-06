const fs = require('fs');
const path = require('path');
const express = require('express')


const { validationResult } = require('express-validator/check');

const router = express.Router();
// const db=require('../models')
// const User=db.user
// const Blog=db.blog
const Blog=require("../models/blog")



exports.getAllBlog = (req, res, next) => {

  Blog.find()
  
    .then(blogs => {
      res.status(200).json({
        message: 'Fetched Blogs successfully.',
        Blogs: blogs,
        
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createBlog = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  // if (!req.file) {
  //   const error = new Error('No image provided.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  const title = req.body.title;
  const content = req.body.content;
  const author= req.userId
  const comments=req.body.comments

  // let creator;
  const blog = new Blog({
    title: title,
    content: content,
    comments:comments,
    
    author: author
  });
  blog
    .save()
  
    .then(result => {
      res.status(201).json({
        message: 'Blog created successfully!',
        // Blog: Blog,
       
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getBlog = (req, res, next) => {
  const blogId = req.body.blogId;;
  Blog.findById(blogId)
    .then(blog => {
      if (!blog) {
        const error = new Error('Could not find Blog.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Blog fetched.', blog: blog });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
 

  // let creator;
  // const blog = new Blog({
  //   title: title,
  //   content: content,
  //   comments:comments,
    
  //   author: author
  // });
  Blog.findById(blogId)
    .then(blog => {
      if (!blog) {
        const error = new Error('Could not find Blog.');
        error.statusCode = 404;
        throw error;
      }
      // if (blog.author.toString() !== req.userId) {
      //   const error = new Error('Not authorized!');
      //   error.statusCode = 403;
      //   throw error;
      // }
    
      blog.title = title;
      // blog.imageUrl = imageUrl;
      blog.content = content;
    blog.comments=comments;
      return Blog.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Blog updated!', blog: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  Blog.findById(blogId)
    .then(blog => {
      if (!blog) {
        const error = new Error('Could not find Blog.');
        error.statusCode = 404;
        throw error;
      }
      // if (Blog.author.toString() !== req.userId) {
      //   const error = new Error('Not authorized!');
      //   error.statusCode = 403;
      //   throw error;
      // }
      // Check logged in user
      // clearImage(Blog.imageUrl);
      return Blog.findByIdAndRemove(blogId);
    })

    .then(result => {
      res.status(200).json({ message: 'Deleted Blog.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// const clearImage = filePath => {
//   filePath = path.join(__dirname, '..', filePath);
//   fs.unlink(filePath, err => console.log(err));
// };
