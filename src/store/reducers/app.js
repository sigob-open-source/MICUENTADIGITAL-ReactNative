// Constants
export const SET_NOTIFICATION_ACTION = 'APP_SET_NOTIFICATION';
export const CLEAR_NOTIFICATION_ACTION = 'APP_CLEAR_NOTIFICATION';

// Handlers
const setNotification = (state, action) => {
  if (state.notification?.message) {
    return state;
  }
  return {
    ...state,
    notification: action?.payload,
  };
};

const clearNotification = (state) => ({
  ...state,
  notification: {
    type: null,
    title: null,
    message: null,
  },
});

// Setup
const ACTION_HANDLERS = {
  [SET_NOTIFICATION_ACTION]: setNotification,
  [CLEAR_NOTIFICATION_ACTION]: clearNotification,
};

const initialState = {
  notification: {
    type: null,
    title: null,
    message: null,
  },
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};