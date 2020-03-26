const mongoose = require('mongoose');

const actSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  itineraryId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('activity', actSchema);