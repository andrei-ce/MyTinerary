const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const passport = require('passport');

// @route   GET /users/test
// @descr   test route
// @access  Public
router.get('/test', (req, res) => {
  res.send({ msg: 'User test route.' });
});

// @route   POST /users/register
// @descr   Registers a user after filling out a form
// @access  Public
router.post(
  '/register',
  [
    check('username', 'Please enter a valid username').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password of minimum 6 chars').isLength({ min: 6 }),
    check('firstName', 'Please enter a first name').not().isEmpty(),
    check('lastName', 'Please enter a last name').not().isEmpty(),
    check('country', 'Please a country').not().isEmpty(),
  ],
  async (req, res) => {
    //HANDLE ERRORS: check if any of the above coused errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('hit an error');
      //format is only not to show errors.errors[{}] - shows errors[{}]
      return res.status(400).json({ errors: errors.array() });
    }
    //HANDLE USERNAME: needs to be unique
    const { username, email, password, firstName, lastName, country } = req.body;
    try {
      let userExists = await User.findOne({ username: username });
      let emailExists = await User.findOne({ email: email });
      if (userExists || emailExists) {
        return res.status(400).json({ errors: [{ msg: 'Username or email already taken' }] });
      }
      // Get users ravatar from gravatar
      const avatar = gravatar.url(email, {
        s: '80', //sets size
        r: 'pg', //filters naked people
        d: 'mm', //sets default image if doesnt exist already
      });
      //Create instance of user to save if afterwards
      let user = new User({
        username,
        email,
        avatar,
        password,
        firstName,
        lastName,
        country,
      });
      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //save user with encrypted password, following schema
      await user.save();
      //set up to return jwt on front end
      const payload = {
        user: {
          id: user.id,
        },
      };
      //use user id to generate token, using jwtSecret, optional configs (expiration)
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        //if no error, return jwtoken to front-end so user can be logged in right away
        if (err) throw err;
        res.json({ token });
      });
      console.log(`User ${username} registered`);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server internal erroar');
    }
  }
);

// @route   POST /users/login
// @descr   Logs a user in: Searches for email, compares passwords, responds with a token (user._id inside)
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    //HANDLE ERRORS: check if any of the above coused errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //format is only not to show errors.errors[{}] - shows errors[{}]
      return res.status(400).json({ errors: errors.array() });
    }

    //HANDLE EMAIL: needs to be unique
    const { email, password } = req.body;
    try {
      user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //decrypt user.password and compare to req.body.password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //set up to return jwt on front end
      const payload = {
        user: {
          id: user.id,
        },
      };

      //use user id to generate token, using jwtSecret, optional configs (expiration)
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        //if no error, return jwtoken
        if (err) throw err;
        res.json({ token });
      });
      console.log(`User ${user.username} logged in`);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server internal error' + err);
    }
  }
);

// @route   GET /users/auth
// @descr   receives a token and returns a user (detailed in the middleware file passport.js)
// @access  Private
router.get('/auth', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.json(req.user);
});

// @route   PUT /users/favorites
// @descr   receives an itinerary_id and adds it to users.favorites, or removes if it exists
// @access  Private
router.put('/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { itinerary_id, user_id } = req.body;
  try {
    //save user in a variable to run if statement
    let user = await User.findOne({ _id: user_id });
    //check if this itinerary is already favorited by user
    if (user.favorites.includes(itinerary_id)) {
      //remove itinerary $pull
      console.log('favorite already exists, removing...');
      await User.updateOne({ _id: user_id }, { $pull: { favorites: itinerary_id } });
      res.send({ msg: 'REMOVE' });
    } else {
      //add itinerary $push
      console.log('adding itinerary to favorites...');
      await User.updateOne({ _id: user_id }, { $push: { favorites: itinerary_id } });
      res.send({ msg: 'ADD' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server internal error' + err);
  }
});

module.exports = router;
