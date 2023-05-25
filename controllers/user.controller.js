const express = require('express');
const { UserModel } = require('../models/user.model');
const { GifModel } = require('../models/gif.model');


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

const registerUser = async (req, res) => {
  const { name, email } = req.body;

  // Check if user with this email already exists
  const userExists = await UserModel.findOne({ email });

  if(userExists) {
      return res.status(400).json({ error: 'User with this email already exists' });
  }

  // Create new user
  const newUser = new UserModel({
      name,
      email,
  });

  try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
};

const getUploaded = async (req, res) => {
  try {
    const userName = req.body.name;
    console.log(userName)
    
    const gifs = await GifModel.find({ uploadedBy: userName });

    console.log(gifs)
    res.status(200).json(gifs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// const getUploaded = async (req, res) => {
//   try {
//     const userEmail = req.body.email;
//     console.log(userEmail)
    
//     const user = await UserModel.find({ email: userEmail }).populate("uploadedGIFS");
//     console.log(user.uploadedGifs)
//     res.status(200).json(user.uploadedGifs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const uploadGIF = async (req, res) => {
  console.log("YES")
  try {
      
    const userEmail = req.body.email;
    const userName = req.body.user;
    const description = req.body.description;
    const flag = req.body.flag;
    
    const user = await UserModel.findOne({ email: userEmail });

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
    
    // https://media.giphy.com/media/765ccrAiB0g9z6EApL/giphy.gif


    const savedGif = await newGif.save();
    console.log(savedGif)

    user.uploadedGIFSCount += 1;
    user.uploadedGIFS.push(savedGif._id);

    await user.save();
    res.json(savedGif);

    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}




const likeGIF = async (req, res) => {
  const email = req.body.email;
  const gifID = req.body.gifID;
  
  try {
      
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
      res.status(500).json({ error: error });
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
  getUploaded,
  registerUser
  
  
};

