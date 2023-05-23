const express = require('express');
const UserModel = require('../models/user.model');

// const jwt = require('jsonwebtoken');

const uploadGIF = async (req, res) => {
  console.log(req)
};

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
};

