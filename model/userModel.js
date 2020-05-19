const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: String,
    default: Date.now
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'itinerary'
    }
  ]
});

module.exports = User = mongoose.model('user', userSchema);
