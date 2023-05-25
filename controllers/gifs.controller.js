const express = require('express');
const { GifModel } = require('../models/gif.model');


// const jwt = require('jsonwebtoken');

const getGifs = async (req, res) => {
    try {
      const gifs = await GifModel.find({}); // fetches all Gifs from the database
      res.json(gifs); // send the fetched gifs back as JSON
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error', error); // in case of error
    }
  };

module.exports = { getGifs };