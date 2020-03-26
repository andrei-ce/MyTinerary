const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');

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
    check('username', 'Please enter a valid username')
      .not()
      .isEmpty()
      .trim(),
    check('email', 'Please include a valid email')
      .isEmail()
      .normalizeEmail(),
    check('password', 'Please enter a password of minimum 6 chars').isLength({ min: 6 }),
    check('firstName', 'Please enter a first name')
      .not()
      .isEmpty(),
    check('lastName', 'Please enter a last name')
      .not()
      .isEmpty(),
    check('country', 'Please a country')
      .not()
      .isEmpty()
      .trim()
  ],
  async (req, res) => {
    //HANDLE ERRORS: check if any of the above coused errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
        s: '200', //sets size
        r: 'pg', //filters naked people
        d: 'mm' //sets default image if doesnt exist already
      });

      //Create instance of user to save if afterwards
      let user = new User({
        username,
        email,
        avatar,
        password,
        firstName,
        lastName,
        country
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //save user with encrypted password, following schema
      await user.save();

      //set up to return jwt on front end
      const payload = {
        user: {
          id: user.id
        }
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

module.exports = router;
