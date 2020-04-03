const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const Comment = require('../model/commentModel');
const { check, validationResult } = require('express-validator');
const passport = require('passport');

// @route   GET /comments/test
// @descr   test route
// @access  Public
router.get('/test', (req, res) => {
  res.send({ msg: 'Comments test route.' });
});

// @route   POST /comments/
// @descr   post a comment to the comments collection, that has date, text, user_data and itinerary_id attached
// @access  Private
router.post(
  '/',
  [
    //authenticate user (private route)
    passport.authenticate('jwt', { session: false }),
    [
      //check if there is something to comment
      check('text', 'Please enter a comment text')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    //validate that there are no errors (if yes, return the .array() method in errors array)
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    //extract all info from body
    const { text, itinerary_id, user } = req.body;

    try {
      let comment = new Comment({
        text,
        itinerary_id,
        user
      });

      console.log(comment);

      await comment.save();

      res.send({ msg: 'Comment posted!' });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server internal error!', error);
    }
  }
);

// @route   GET /comments/:itinerary_id
// @descr   get all comments pertaining to that itinerary ID
// @access  Public
router.get('/:itinerary_id', async (req, res) => {
  try {
    let id = req.params.itinerary_id;
    const comments = await Comment.find({ itinerary_id: id }).populate('user', [
      'avatar',
      'username'
    ]);

    //at some point use moment.js to format date

    res.json({ comments });
  } catch (error) {
    res.status(500).send('Server internal error!' + error);
  }
});

// @route   DELETE /comments/
// @descr   delete a comment by its id IF you are the same user
// @access  Private

// @route   PUT /comments/
// @descr   edit a comment by its id IF you are the same user
// @access  Private

module.exports = router;
