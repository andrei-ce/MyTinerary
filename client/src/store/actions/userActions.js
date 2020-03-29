import { WILL_REGISTER_USER, SUCCESS_REGISTER_USER, FAIL_REGISTER_USER } from './types';
import axios from 'axios';

export const postUser = ({
  avatar,
  username, //takes in all these fields from react store state
  email,
  password,
  firstName,
  lastName,
  country
}) => async (dispatch) => {
  //prepate body and headers of POST request
  const body = {
    avatar: avatar,
    username: username,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    country: country
  };
  const config = {
    headers: {
      'Content-type': 'application/json' //not sure this is necessary for json
    }
  };

  try {
    dispatch({ type: WILL_REGISTER_USER });
    const res = await axios.post('http://localhost:5000/users/register/', body, config);
    dispatch({
      type: SUCCESS_REGISTER_USER,
      payload: res.data //this is the token we are sending back with JWT
    });
  } catch (err) {
    console.log(err.response.data.errors);
    dispatch({
      type: FAIL_REGISTER_USER
    });
  }
};
