const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const Router = require('express').Router;
const { getGifs } = require('../controllers/gifs.controller');





const gifRouter = Router();

gifRouter
  .get("/getGifs", getGifs)
  



  module.exports = gifRouter;
