import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initState = {
  msg: {},
  status: null,
};

const errReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return { msg: action.payload.msg };
    case CLEAR_ERRORS:
      return { msg: '' };
    default:
      return state;
  }
};

export default errReducer;
