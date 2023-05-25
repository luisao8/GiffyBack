const express = require('express');
const { GifModel } = require('../models/gif.model');



const getGifs = async (req, res) => {
    try {
      const gifs = await GifModel.find({});
      res.json(gifs); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error', error); 
    }
  };

module.exports = { getGifs };