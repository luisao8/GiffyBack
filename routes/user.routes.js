const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
// const jwksRsa = require('jwks-rsa');
const Router = require('express').Router;
const { uploadGIF, logoutUser } = require('../controllers/user.controller');




const userRouter = Router();




// async function ensureUserExists(req, res, next) {

//   if (!req.user) {
//     console.log("Invalid")
//     return next(); 
//     // or return a response indicating the user is not authenticated
//   }
//   const { sub: auth0Id, email, name } = req.user;

//   let user = await UserModel.findOne({ auth0Id });

//   if (!user) {
//     // The user is logging in for the first time (i.e., registering)
//     user = new UserModel({
//       auth0Id,
//       email,
//       name,
//     });

//     await user.save();
//     console.log(user)
//   } else {
//     // The user is logging in again, so you might want to update their information
//     user.email = email;
//     user.name = name;
//     await user.save();
//     console.log(user)
//   }

//   // Attach the user object to the request
//   req.userRecord = user;

//   // Proceed to the next middleware or route handler
//   next();
// }


// userRouter.use(ensureUserExists);


userRouter
  .post("/upload", uploadGIF)
  .post('/logout', logoutUser)

module.exports = userRouter;


