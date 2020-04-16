import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initState = {
  msg: null,
  status: null,
};

const errReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    case CLEAR_ERRORS:
      return {
        msg: null,
        status: null,
      };
    default:
      return state;
  }
};

export default errReducer;
