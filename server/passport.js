const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./model/userModel');
const config = require('config');
const passport = require('passport');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // HAY QUE USAR AUTHORIZATION en key y 'Bearer + token' en value
  secretOrKey: config.get('jwtSecret') // needs to be called opts.secretOrKey
};

module.exports = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.user.id)
      .select('-password')
      .populate('favorites') //populate favorites from itinerary ids to itinerary objects
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => console.log(err));
  })
);
