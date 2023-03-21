// Internal dependencies
import { Action, ActionHandler } from '../../types/redux';

// Types & Interfaces
export interface AuthStateProps {
  accessToken: string | null;
  refreshToken: string | null;
}

// Constants
export const LOGIN = 'AUTH_LOGIN';
export const SET_ACCESS_TOKEN = 'AUTH_SET_ACCESS_TOKEN';
export const CLEAR_AUTH = 'AUTH_CLEAR_AUTH';

// Action handlers
type LoginHandlerPayload = {
  access: string | null;
  refresh: string | null;
};
const loginHandler = (
  state: AuthStateProps,
  action: Action<LoginHandlerPayload>,
): AuthStateProps => ({
  ...state,
  accessToken: action.payload.access,
  refreshToken: action.payload.refresh,
});

const setTokenHandler = (
  state: AuthStateProps,
  action: Action<string | null>,
): AuthStateProps => ({
  ...state,
  accessToken: action.payload,
});

const clearAuthHandler = (): AuthStateProps => ({
  accessToken: null,
  refreshToken: null,
});

// Config
const ACTION_HANDLERS = {
  [LOGIN]: loginHandler,
  [SET_ACCESS_TOKEN]: setTokenHandler,
  [CLEAR_AUTH]: clearAuthHandler,
} as ActionHandler<AuthStateProps>;

const initialState: AuthStateProps = {
  accessToken: null,
  refreshToken: null,
};

export default (state: AuthStateProps, action: Action) => {
  const currentState = state ?? initialState;
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(currentState, action) : state;
};
