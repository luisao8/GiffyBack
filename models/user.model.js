const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const UserSchema = new Schema({
  
  name: { type: String, required: true },
  email: { type: String },
  likedGIFS: [{ type: Schema.Types.ObjectId, ref: 'Gif' }],
  likedGIFSCount: { type: Number, default: 0},
  uploadedGIFS: [{ type: Schema.Types.ObjectId, ref: 'Gif' }],
  uploadedGIFSCount: { type: Number, default: 0},
});

const UserModel = model('User', UserSchema);

module.exports = { UserModel };


