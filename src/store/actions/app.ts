// Internal dependencies
import { AlertNotification } from '../../types/alert';
import { GenericDispatch } from '../../types/redux';
import { SET_NOTIFICATION_ACTION, CLEAR_NOTIFICATION_ACTION } from '../reducers/app';

const dispatchNotification = (
  dispatch: GenericDispatch,
  notification: AlertNotification,
) => {
  dispatch({
    type: SET_NOTIFICATION_ACTION,
    payload: notification,
  });
};

const dispatchClearNotification = (dispatch: GenericDispatch) => {
  dispatch({
    type: CLEAR_NOTIFICATION_ACTION,
  });
};

export {
  dispatchNotification,
  dispatchClearNotification,
};
