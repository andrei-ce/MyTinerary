//ensure some sort of structure for the documents in our database collection
const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  city_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: `This is the description of an amazing collection of activities that we have specially curated for you to have a great time!`
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
  },
  img: {
    type: String,
    default: `https://source.unsplash.com/fz8_SONkBB8`
  },
  city_data: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'city'
  }
});

module.exports = mongoose.model('itinerary', itinerarySchema);