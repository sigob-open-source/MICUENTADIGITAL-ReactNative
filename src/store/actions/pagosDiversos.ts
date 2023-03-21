// Internal dependencies
import { PadronProps } from '../../services/catalogos/padrones.types';
import { GenericDispatch } from '../../types/redux';
import {
  SET_PADRON,
} from '../reducers/pagosDiversos';

const dispatchSetPadron = (dispatch: GenericDispatch, payload: PadronProps | null) => {
  dispatch({
    type: SET_PADRON,
    payload,
  });
};

export {
  dispatchSetPadron,
};
