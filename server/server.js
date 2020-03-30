const connectDB = require('./config/db');
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
require('./passport');

// Connect Database
connectDB();

//Initialize Middlewares
app.use(cors()); //Initialize communication between front and back end server (confirm)
app.use(express.json({ extended: false })); //To accept requests in URL Enconded format (easier in Postman)
app.use(express.urlencoded({ extended: true })); //To accept requests in json (raw body format in Postman)
app.use(passport.initialize());

//Routes definition: what is the response for each endpoint?
app.use('/cities', require('./routes/cities'));
app.use('/itineraries', require('./routes/itineraries'));
app.use('/activities', require('./routes/activities'));
app.use('/users', require('./routes/users'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running on ' + port + 'port');
});
