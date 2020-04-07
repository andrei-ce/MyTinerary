import {
  GET_COMMENTS,
  REQUEST_COMMENTS,
  REQ_POST_COMMENT,
  POST_COMMENT,
  DELETE_COMMENT,
} from '../actions/types';

const initState = {
  ifFetching: false,
  comments: [],
};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return { ...state, comments: [], isFetching: true };
    case GET_COMMENTS:
      return { ...state, isFetching: false, comments: action.payload };
    case REQ_POST_COMMENT:
      return { ...state, isFetching: true };
    case POST_COMMENT:
      return { ...state, isFetching: false };
    case DELETE_COMMENT:
      return { ...state };
    default:
      return state;
  }
};

export default commentReducer;
