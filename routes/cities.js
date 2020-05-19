const express = require('express');
const cityModel = require('../model/cityModel');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send({ msg: 'Cities test route.' });
});

router.get('/all', (req, res) => {
  cityModel.find({})
    .then(files => {
      res.send(files)
    })
    .catch(err => console.log('Error type: ', err));
});

router.get('/onecity/:city_id', (req, res) => {
  cityModel.find({})
    .then(files => {
      res.send(files)
    })
    .catch(err => console.log('Error type: ', err));
});

router.post('/', (req, res) => {
  //call out Schema and assign whatever we type on req.body.X as name and country
  const newCity = new cityModel({
    name: req.body.name,
    country: req.body.country
  })
  //Mongoose method .save() that returns a promise. If resolved, you can send the object you created in your response back to the DB
  cityModel.findOne({ name: newCity.name })
    .then(city => {
      if (city) res.status(500).send("City already exists.");
      else {
        newCity.save()
          .then(city => {
            res.send(city)
          })
      }
    })
    .catch(err => {
      res.status(500).send("Server error: " + err)
    })
});

module.exports = router;
