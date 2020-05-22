const mongoose = require('mongoose');
const config = require('config');
//config.get() gets any value in default.json
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connected!');
  } catch (err) {
    console.log('Error: ' + err.message);
    //force exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
