const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    //this way if a user deletes its account, it will delete all of its posts?
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  itinerary_id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    requires: true,
    default: Date.now(),
  },
});

module.exports = Comment = mongoose.model('comment', commentSchema);
