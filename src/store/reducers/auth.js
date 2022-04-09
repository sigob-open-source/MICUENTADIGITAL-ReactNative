// Constants
export const LOGIN = 'AUTH_LOGIN';
export const SET_ACCESS_TOKEN = 'AUTH_SET_ACCESS_TOKEN';
export const CLEAR_AUTH = 'AUTH_CLEAR_AUTH';

// Action handlers
const loginHandler = (state, action) => {
  return {
    ...state,
    accessToken: action.payload.access,
    refreshToken: action.payload.refresh,
  };
};

const setTokenHandler = (state, action) => {
  return {
    ...state,
    accessToken: action.payload,
  };
};

const clearAuthHandler = () => ({
  accessToken: null,
  refreshToken: null,
});

// Config
const ACTION_HANDLERS = {
  [LOGIN]: loginHandler,
  [SET_ACCESS_TOKEN]: setTokenHandler,
  [CLEAR_AUTH]: clearAuthHandler,
};

const initialState = {
  accessToken: null,
  refreshToken: null,
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
