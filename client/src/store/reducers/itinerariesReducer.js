import { GET_ITINERARIES } from '../actions/types';
import { REQUEST_ITINERARIES } from '../actions/types'

const initState = {
  isFetching: false,
  itineraries: []
}

const itinerariesReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_ITINERARIES:
      return { ...state, isFetching: true }
    case GET_ITINERARIES:
      return { ...state, itineraries: action.payload, isFetching: false }
    default:
      break;
  }
  return state;
}

export default itinerariesReducer;