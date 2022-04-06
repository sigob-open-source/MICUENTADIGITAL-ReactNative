// Constants
import {LOGIN, SET_ACCESS_TOKEN, CLEAR_AUTH} from '../reducers/auth';

const dispatchLogin = (dispatch, session) => {
  dispatch({
    type: LOGIN,
    payload: session,
  });
};

const dispatchSetToken = (dispatch, token) => {
  dispatch({
    type: SET_ACCESS_TOKEN,
    payload: token,
  });
};

const dispatchClearAuth = dispatch => {
  dispatch({
    type: CLEAR_AUTH,
  });
};

export {dispatchLogin, dispatchSetToken, dispatchClearAuth};