const express = require('express');
const { UserModel } = require('../models/user.model');
const { GifModel } = require('../models/gif.model');


// const jwt = require('jsonwebtoken');

const getLiked = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await UserModel.findOne({ email: userEmail  }).populate('likedGIFS');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUploaded = async (req, res) => {
  try {
    const userName = req.body.user;
    
    const uploadedGifs = await GifModel.find({ uploadedBy: userName });
    res.status(200).json(uploadedGifs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const uploadGIF = async (req, res) => {
  try {
      // Get user email from request body
      const userEmail = req.body.email;
      const userName = req.body.user;
      const description = req.body.description;
      const flag = req.body.flag;
      

      // Find user by email
      const user = await UserModel.findOne({ email: userEmail  });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      if (!flag) {
        const newGif = new GifModel({
          urlLink: req.body.urlLink,
          uploadedBy: userName,
          description: description, 
      });
       const savedGif = await newGif.save();
       res.json(savedGif);

      } else {
        const newGif = new GifModel({
          urlLink: req.body.urlLink,
          user: user._id,
          uploadedBy: userName,
          description: description, 
      });

      // Save the GIF
      const savedGif = await newGif.save();

      user.uploadedGIFS += 1;
      await user.save();

      // Send response
      res.json(savedGif);

      }

      // Create new GIF with user ID
      

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
}

// const likeGIF = async (req, res) => {
//   const userID = req.body.userID;
//   const gifID = req.body.gifID;
//   console.log(userID)
//   console.log(gifID )
//   try {
//       // Get user email from request body
//       // const userEmail = req.body.email;
      

//       // Find user by email
//       const user = await UserModel.findByIdAndUpdate(
//         userID,
//         { $push: { likedGIFS: gifID } },
//         { new: true, useFindAndModify: false }
//     );
//       if (!user) {
//           console.log("USER NOT FOUND")
//           return res.status(404).json({ error: 'User not found' });
//       }

//       const gif = await GifModel.findByIdAndUpdate(
//         gifID,
//         { $inc: { likes: 1 } },
//         { new: true, useFindAndModify: false }
//     );

//     if (!gif) {
//       console.log("GIF NOT FOUND")
//       return res.status(404).json({ error: 'GIF not found' });
//     }
   
//       res.status(200).json("Liked and one more for the team");

//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//   }
// }

const likeGIF = async (req, res) => {
  const email = req.body.email;
  const gifID = req.body.gifID;
  
  try {
      // Get user email from request body
      // const userEmail = req.body.email;
      

      // Find user by email
      const user = await UserModel.findOneAndUpdate(
        { email: email },
        { $push: { likedGIFS: gifID } },
        { new: true, useFindAndModify: false }
    );
      if (!user) {
          console.log("USER NOT FOUND")
          return res.status(404).json({ error: 'User not found IN IDANDUPDATE' });
      }

      const gif = await GifModel.findByIdAndUpdate(
        gifID,
        { $inc: { likes: 1 } },
        { new: true, useFindAndModify: false }
      );
      

    if (!gif) {
      console.log("GIF NOT FOUND")
      return res.status(404).json({ error: 'GIF not found' });
    }
   
      res.status(200).json("Liked and one more for the team");

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
}



const logoutUser = async (req, res) => {
  try {
    const body = req.body;
    const user = body.user;
    const email = body.email;

    console.log(user);
    console.log(email);
    console.log(`User  has logged out`);
    res.json({ message: 'Logged out' });
    } catch (error) {
      console.log(error)}
    };

module.exports = {
  uploadGIF,
  logoutUser,
  likeGIF,
  getLiked,
  getUploaded
  
  
};

