import { GET_CITIES } from '../actions/types';
import { REQUEST_CITIES } from '../actions/types';

const initState = {
  isFetching: false,
  cities: []
};

const citiesReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_CITIES:
      return { ...state, isFetching: true };
    case GET_CITIES:
      return { ...state, cities: action.payload, isFetching: false };
    default:
      return state;
  }
};

export default citiesReducer;
