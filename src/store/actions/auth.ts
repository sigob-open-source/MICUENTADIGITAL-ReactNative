// Constants
import { GenericDispatch } from '../../types/redux';
import { LOGIN, SET_ACCESS_TOKEN, CLEAR_AUTH } from '../reducers/auth';

type LoginPayload = {
  access: string | null;
  refresh: string | null;
};
const dispatchLogin = (
  dispatch: GenericDispatch,
  session: LoginPayload,
) => {
  dispatch({
    type: LOGIN,
    payload: session,
  });
};

const dispatchSetToken = (dispatch: GenericDispatch, token: string | null) => {
  dispatch({
    type: SET_ACCESS_TOKEN,
    payload: token,
  });
};

const dispatchClearAuth = (dispatch: GenericDispatch) => {
  dispatch({
    type: CLEAR_AUTH,
  });
};

export { dispatchLogin, dispatchSetToken, dispatchClearAuth };
