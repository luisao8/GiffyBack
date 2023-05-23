const express = require('express');
const UserModel = require('../models/user.model');

const jwt = require('jsonwebtoken');

const uploadGIF = async (req, res) => {
  console.log(req)
};

const logoutUser = async (req, res) => {
  console.log(`User ${req.user.sub} has logged out`);
  res.json({ message: 'Logged out' });
};

module.exports = {
  uploadGIF,
  logoutUser,
};

