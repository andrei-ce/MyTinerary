const connectDB = require('./config/db');
const express = require('express');
const app = express();
const cors = require('cors');

// Connect Database
connectDB();

app.use(cors());
//This is to accept requests in JSON format (so we dont )
app.use(express.json({ extended: false }));
//This is to accept requests in URL Enconded format (POSTMAN)
app.use(express.urlencoded({ extended: true }));

//Routes definition: what is the response for each endpoint?
app.use('/cities', require('./routes/cities'));
app.use('/itineraries', require('./routes/itineraries'));
app.use('/activities', require('./routes/activities'));
app.use('/users', require('./routes/users'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running on ' + port + 'port');
});
