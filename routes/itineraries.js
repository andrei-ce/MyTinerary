const express = require('express');
const itineraryModel = require('../model/itineraryModel');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send({ msg: 'Itinerary test route.' });
});

router.get('/all', (req, res) => {
  itineraryModel
    .find({})
    .then((files) => {
      res.send(files);
    })
    .catch((err) => console.log(err));
});

// router.get('/bycity/:city_id',
//   (req, res) => {
//     let cityRequested = req.params.city_id;
//     itineraryModel.find({ city_id: cityRequested })
//       .populate('city_data')
//       .then(files => {
//         res.send(files)
//       })
//       .catch(err => console.log(err));
//   });

router.get('/bycity/:city_id', async (req, res) => {
  let id = req.params.city_id;
  try {
    let files = await itineraryModel.find({ city_id: id }).populate('city_data');
    res.send(files);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
