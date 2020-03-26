import { GET_ITINERARIES, REQUEST_ITINERARIES } from './types';
import axios from 'axios';

export const getItineraries = (id) => (dispatch) => {
  dispatch({ type: REQUEST_ITINERARIES })
  axios.get('http://localhost:5000/itineraries/bycity/' + id)
    .then(res => {
      dispatch({ type: GET_ITINERARIES, payload: res.data })
    })
    .catch(err => console.log(err));
};