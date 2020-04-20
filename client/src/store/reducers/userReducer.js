import {
  WILL_REGISTER_USER,
  SUCCESS_REGISTER_USER,
  FAIL_REGISTER_USER,
  WILL_LOGIN_USER,
  SUCCESS_LOGIN_USER,
  FAIL_LOGIN_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_FAVE,
  REMOVE_FAVE,
  FAVE_FAIL,
} from '../actions/types';

const initState = {
  isFetching: false,
  isAuthenticated: false,
  user: null,
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
      return { ...state, isFetching: false }; //no need for ...payload in the return. not using it as state or props, saving it on local storage
    case FAIL_REGISTER_USER:
    case FAIL_LOGIN_USER:
      if (localStorage.getItem('token')) {
        return localStorage.removeItem('token');
      }
      return { ...state, token: null, isAuthenticated: false, isFetching: false };
    //this is to load user info! So we need to use payload because the reponse is a user object
    // finish this action below
    case LOGOUT_USER:
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case AUTH_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };
    case ADD_FAVE:
      return {
        ...state,
        user: { ...state.user, favorites: [...state.user.favorites, payload] },
      };
    case REMOVE_FAVE:
      var removeId = payload._id;
      let newFavorites = state.user.favorites.filter((it) => it._id !== removeId);
      return {
        ...state,
        user: { ...state.user, favorites: newFavorites },
      };
    // FAVE: return {...state, user.favourites : [action.payload, ...state.user.favourites]}
    case FAVE_FAIL:
      return state;
    default:
      return state;
  }
};

export default userReducer;
