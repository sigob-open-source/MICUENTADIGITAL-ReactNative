import {
  CLEAR_NOTIFICATION_ACTION,
  SET_NOTIFICATION_ACTION,
} from '../reducers/app';

const notificationAction = (dispatch, notification) => dispatch({
  type: SET_NOTIFICATION_ACTION,
  payload: notification,
});

const clearNotificationAction = (dispatch) => dispatch({ type: CLEAR_NOTIFICATION_ACTION });

export {
  notificationAction,
  clearNotificationAction,
};
