import { WILL_REGISTER_USER, SUCCESS_REGISTER_USER, FAIL_REGISTER_USER } from '../actions/types';

const initState = {
  isFetching: false,
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token')
};

const userReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case WILL_REGISTER_USER:
      return { ...state, isFetching: true };

    case SUCCESS_REGISTER_USER:
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, isAuthenticated: true, isFetching: false };
    case FAIL_REGISTER_USER:
      if (localStorage.getItem('token') !== undefined) {
        return localStorage.removeItem('token');
      }
      return { ...state, token: null, isAuthenticated: false, isFetching: false };
    default:
      return state;
  }
};

export default userReducer;
