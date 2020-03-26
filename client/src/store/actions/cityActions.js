import { GET_CITIES, REQUEST_CITIES } from './types';
import axios from 'axios';

export const getCities = () => (dispatch) => {
  dispatch({ type: REQUEST_CITIES })
  axios.get('http://localhost:5000/cities/all')
    .then(res =>
      dispatch({ type: GET_CITIES, payload: res.data }))
    .catch(err => console.log(err));
};