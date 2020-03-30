import {
  WILL_REGISTER_USER,
  SUCCESS_REGISTER_USER,
  FAIL_REGISTER_USER,
  WILL_LOGIN_USER,
  SUCCESS_LOGIN_USER,
  FAIL_LOGIN_USER,
  AUTH_USER
} from '../actions/types';

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
    case WILL_LOGIN_USER:
      return { ...state, isFetching: true };
    // Login OK = this will only return a token
    case SUCCESS_REGISTER_USER:
    case SUCCESS_LOGIN_USER:
      localStorage.setItem('token', payload.token);
      return { ...state, isAuthenticated: true, isFetching: false }; //no need for ...payload in the return. not using it as state or props, saving it on local storage
    case FAIL_REGISTER_USER:
    case FAIL_LOGIN_USER:
      if (localStorage.getItem('token') !== undefined) {
        return localStorage.removeItem('token');
      }
      return { ...state, token: null, isAuthenticated: false, isFetching: false };
    //this is to load user info! So we need to use payload because the reponse is a user object
    // finish this action below
    case AUTH_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      };
    // add logout action
    default:
      return state;
  }
};

export default userReducer;
