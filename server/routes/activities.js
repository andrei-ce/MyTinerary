const express = require('express');
const actModel = require('../model/actModel');
const itineraryModel = require('../model/itineraryModel');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send({ msg: 'Activities test route.' });
});

// @route   GET /activities/:itinerary_id
// @descr   Get activities pertaining to a certain itinerary
// @access  Public
router.get('/:itinerary_id', (req, res) => {
  let itineraryRequested = req.params.itinerary_id; //pass what to find in the activities collection
  actModel
    .find({ itinerary_id: itineraryRequested })
    .then((files) => {
      res.send(files);
    })
    .catch((err) => console.log('Error type: ', err));
});

// ==================== NOT WORKING ====================
// @route   POST /activities/:itinerary_id
// @descr   Post an activity, given you have the itinerary id
// @access  Public (should be private)
router.post('/:itinerary_id', (req, res) => {
  const newActivity = new actModel({
    name: req.body.name,
    img: req.body.img,
    itinerary_id: req.body.itinerary_id
  });
  newActivity
    .save()
    .then((a) => {
      res.send(a);
    })
    .catch((err) => console.log('Error type: ', err));
});

module.exports = router;
