// Internal dependencies
import { AlertNotification } from '../../types/alert';
import { Action, ActionHandler } from '../../types/redux';

// Constants
export const SET_NOTIFICATION_ACTION = 'APP_SET_NOTIFICATION';
export const CLEAR_NOTIFICATION_ACTION = 'APP_CLEAR_NOTIFICATION';

export interface AppStateProps {
  notification: AlertNotification | null;
}

// Handlers
const setNotification = (
  state: AppStateProps,
  action: Action<AlertNotification>,
): AppStateProps => {
  if (state.notification?.message) {
    return state;
  }

  return {
    ...state,
    notification: action.payload,
  };
};

const clearNotification = (state: AppStateProps): AppStateProps => ({
  ...state,
  notification: null,
});

// Setup
const ACTION_HANDLERS = {
  [SET_NOTIFICATION_ACTION]: setNotification,
  [CLEAR_NOTIFICATION_ACTION]: clearNotification,
} as ActionHandler<AppStateProps>;

const initialState : AppStateProps = {
  notification: null,
};

export default (state : AppStateProps, action: Action) => {
  const currentState = state ?? initialState;
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(currentState, action) : state;
};
