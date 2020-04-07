import {
  GET_COMMENTS,
  REQUEST_COMMENTS,
  REQ_POST_COMMENT,
  POST_COMMENT,
  DELETE_COMMENT,
} from './types';
import axios from 'axios';

export const getComments = (itinerary_id) => async (dispatch) => {
  dispatch({ type: REQUEST_COMMENTS });
  try {
    const res = await axios.get('http://localhost:5000/comments/' + itinerary_id);
    dispatch({ type: GET_COMMENTS, payload: res.data.comments });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (itinerary_id, user, text) => async (dispatch) => {
  //prepate body and headers of POST request
  const body = {
    user: user,
    itinerary_id: itinerary_id,
    text: text,
  };
  const config = {
    headers: {
      'Content-type': 'application/json', //not sure this is necessary for json
      Authorization: 'Bearer ' + localStorage.getItem('token'), // if there isnt a token then it will read 'Bearer undefined'
    },
  };
  dispatch({ type: REQ_POST_COMMENT });
  try {
    await axios.post('http://localhost:5000/comments/', body, config);
    dispatch({ type: POST_COMMENT });
    dispatch(getComments(itinerary_id));
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = (comment_id, user_id, itinerary_id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  try {
    await axios.delete(`http://localhost:5000/comments/${comment_id}/${user_id}`, config);
    dispatch({ type: DELETE_COMMENT });
    dispatch(getComments(itinerary_id));
  } catch (err) {
    console.log(err);
  }
};
