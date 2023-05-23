const express = require('express');
const UserModel = require('../models/user.model');
const sendResetEmail = require('../utils/sendResetEmail');
const jwt = require('jsonwebtoken');
const matchPassword = require('../utils/passwordManager');
const bcrypt = require('bcrypt');
const validator = require('validator');
const RolModel = require('../models/rol.model');
const uploadImage = require('../utils/cloudinary');
const fs = require('fs-extra');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
};

const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    birthday,
    rol
  } = req.body;

  try {
    const rolUser = await RolModel.find({ name: rol });
    const realRol = rolUser[0]._id;
    console.log(realRol);
    const user = await UserModel.signup(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      birthday,
      realRol
    );

    const token = createToken(user._id);

    res.status(200).send({ email, token, id: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);

    const token = createToken(user._id);

    if (user) {
      res.status(200).send({ message: 'User exists!', id: user._id, token });
    } else if (!user) {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};
