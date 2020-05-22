import { GET_ACT, REQUEST_ACT } from './types';
import axios from 'axios';

export const getActivities = (id) => (dispatch) => {
  dispatch({ type: REQUEST_ACT });
  axios
    .get('/activities/' + id)
    .then((res) => {
      dispatch({ type: GET_ACT, payload: res.data });
    })
    .catch((err) => console.log(err));
};
