import { GET_ERRORS, CLEAR_ERRORS } from './types';

//return errors

export const returnErrors = (msg, status) => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: { msg, status },
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
