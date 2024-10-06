const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

const app = express();
require('dotenv').config();
const db=require('./models')
// const User=db.user
// const Blog=db.blog





// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
// app.use(bodyParser.json()); // application/json

// app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json()); // For JSON bodies
// app.use(bodyParser.urlencoded({ extended: true })); // For URL-encoded bodies


// For now setting the access-control-origin header to all(*) to accept the request from any origin and being processed-serverd by the server. After deployment, generally we give the frontend URL here
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// app.use('/blog', blogRoutes);
// app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    app.use('/blog', blogRoutes);
    app.use('/auth', authRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// const User = require('./models/user'); // Adjust the path as necessary
// mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(async () => {
//   const user = new User({ email: 'test@example.com', password: 'password', name: 'Test User' });
//   const result = await user.save();
//   console.log(result);
//   mongoose.connection.close();
// })
// .catch(err => console.error(err));


const PORT = process.env.PORT || 8080;

