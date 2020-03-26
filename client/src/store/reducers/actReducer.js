import { GET_ACT, REQUEST_ACT } from '../actions/types';

const initState = {
  isFetching: false,
  activities: []
};

const actReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_ACT:
      return { ...state, isFetching: true };
    case GET_ACT:
      return { ...state, activities: action.payload, isFetching: false };
    default:
      return state;
  }
};

export default actReducer;
