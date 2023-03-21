// Internal dependencies
import { PadronProps } from '../../services/catalogos/padrones.types';
import { Action, ActionHandler } from '../../types/redux';

// Types & Interfaces
export interface PagosDiversosStateProps {
  tipoDePadron: PadronProps | null;
}

// Constants
export const SET_PADRON = 'PAGOS_DIVERSOS_SET_PADRON';

// Handlers
type SetPadronAction = Action<PadronProps | null>;
const setPadron = (
  state: PagosDiversosStateProps,
  action: SetPadronAction,
): PagosDiversosStateProps => ({
  ...state,
  tipoDePadron: action.payload,
});

const ACTION_HANDLERS = {
  [SET_PADRON]: setPadron,
} as ActionHandler<PagosDiversosStateProps>;

const initialState: PagosDiversosStateProps = {
  tipoDePadron: null,
};

export default (state: PagosDiversosStateProps, action: Action) => {
  const currentState = state ?? initialState;

  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(currentState, action) : currentState;
};
