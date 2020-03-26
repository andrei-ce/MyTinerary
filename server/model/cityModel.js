//ensure some sort of structure for the documents in our database collection
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  img: {
    type: String,
    default: `https://source.unsplash.com/WoZs8gGyQBY`
  },
  description: {
    type: String,
    default: `Most visited city in this country. Famous for its city planning, cosmopolitan environment, unique art, sunny days, and clubs! Trapped between mountains and the sandy shores, there is something for everyone`
  }
});

module.exports = mongoose.model('city', citySchema);