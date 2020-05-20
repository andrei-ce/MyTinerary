const express = require('express');
const passport = require('passport');
require('./passport');
const path = require('path');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

// Connect Database
connectDB();

//Initialize Middlewares
app.use(passport.initialize());
app.use(cors()); //Initialize communication between front and back end server (confirm)
app.use(express.json({ extended: false })); //To accept requests in URL Enconded format (easier in Postman)
app.use(express.urlencoded({ extended: true })); //To accept requests in json (raw body format in Postman)

//Routes definition: what is the response for each endpoint?
app.use('/cities', require('./routes/cities'));
app.use('/itineraries', require('./routes/itineraries'));
app.use('/activities', require('./routes/activities'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running on ' + port + 'port');
});
