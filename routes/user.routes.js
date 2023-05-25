const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
// const jwksRsa = require('jwks-rsa');
const Router = require('express').Router;
const { uploadGIF, logoutUser, likeGIF, getUploaded, getLiked } = require('../controllers/user.controller');
const { UserModel } = require('../models/user.model.js');






const userRouter = Router();


// async function ensureUserExists(req, res, next) {

  
//   const body = req.body;
//   const name = body.user;
//   const email = body.email;

//   let user = await UserModel.findOne({ email: email });

//   if (!user) {
//     // The user is logging in for the first time (i.e., registering)
//     user = new UserModel({
//       name,
//       email,
//     });

//     await user.save();
//     console.log("NEW USER IN DB")
//   } else {
//     // The user is logging in again, so you might want to update their information
//     user.email = email;
//     user.name = name;
//     await user.save();
//     console.log("LOGGED IN TO DB")
//   }

//   // Attach the user object to the request
//   req.userRecord = user;

//   // Proceed to the next middleware or route handler
//   next();
// }


// userRouter.use(ensureUserExists);

userRouter
  .post("/getLiked", getLiked)
  .post("/getUploaded", getUploaded)
  .post("/upload", uploadGIF)
  .post("/like", likeGIF)
  .post('/logout', logoutUser)

module.exports = userRouter;





