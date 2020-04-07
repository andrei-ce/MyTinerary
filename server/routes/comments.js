const express = require('express');
const router = express.Router();
const Comment = require('../model/commentModel');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const moment = require('moment');

// @route   GET /comments/test
// @descr   test route
// @access  Public
router.get('/test', (req, res) => {
  res.send({ msg: 'Comments test route.' });
});

// @route   GET /comments/:itinerary_id
// @descr   get all comments pertaining to that itinerary ID
// @access  Public
router.get('/:itinerary_id', async (req, res) => {
  try {
    let id = req.params.itinerary_id;
    const comments = await Comment.find({ itinerary_id: id }).populate('user', [
      'avatar',
      'username',
    ]);

    res.json({ comments });
  } catch (error) {
    res.status(500).send('Server internal error: ' + error);
  }
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
      check('text', 'Please enter a comment text').not().isEmpty(),
    ],
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
        user,
      });

      await comment.save();

      res.send({ msg: 'Comment posted!' });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server internal error: ', error);
    }
  }
);

// @route   DELETE /comments/:comment_id
// @descr   delete a comment by its id IF you are the same user
// @access  Private
router.delete(
  '/:comment_id/:user_id',
  //authenticate user (private route)
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const comment_id = req.params.comment_id;
    const user_id = req.params.user_id;
    try {
      const commentToDelete = await Comment.findById(comment_id);
      if (!commentToDelete) {
        res.status(404).send('Comment not found');
      }
      //check if user is the creator
      if (commentToDelete.user.toString() === user_id) {
        await Comment.findByIdAndDelete(comment_id);
      } else {
        res.status(401).send('User not authorized!!!');
      }
      res.send({ msg: 'Comment successfully deleted: ' + commentToDelete.text });
      console.log('Comment successfully deleted!');
    } catch (error) {
      res.status(500).send('Server internal error: ' + error);
    }
  }
);

// @route   PUT /comments/
// @descr   edit a comment by its id IF you are the same user
// @access  Private

module.exports = router;
