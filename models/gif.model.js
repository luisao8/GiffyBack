const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const UserModel = require('../models/user.model');

const gifSchema = new Schema({
    urlLink: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    uploadedBy: {
        type: String,
    },
    description: {
        type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });
  


  const GifModel = model('Gif', gifSchema);


  module.exports = { GifModel };

  