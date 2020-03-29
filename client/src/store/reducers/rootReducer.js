import { combineReducers } from 'redux';
import citiesReducer from './citiesReducer';
import itinerariesReducer from './itinerariesReducer';
import actReducer from './actReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  activities: actReducer,
  users: userReducer
});
export default rootReducer;
