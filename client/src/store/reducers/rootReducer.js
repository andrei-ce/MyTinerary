import { combineReducers } from 'redux';
import citiesReducer from './citiesReducer';
import itinerariesReducer from './itinerariesReducer';
import actReducer from './actReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';
import errReducer from './errReducer';

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  activities: actReducer,
  users: userReducer,
  comments: commentReducer,
  errors: errReducer,
});
export default rootReducer;
