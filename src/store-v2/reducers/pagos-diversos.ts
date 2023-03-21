/* eslint-disable no-param-reassign */
// External dependencies
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

// Internal dependencies
import { PadronProps } from '../../services/catalogos/padrones.types';
import { CiudadanoCajaProps } from '../../services/cuentaunicasir/ciudadano-types';
import { EmpresaCajaProps } from '../../services/cuentaunicasir/empresa-types';
import { ContribuyenteCajaProps } from '../../services/empresas/contribuyentes-caja-public-types';
import { LadaProps } from '../../services/usuarios/lada.types';

// Types & Interfaces
export interface PagosDiversosStateProps {
  tipoDePadron: PadronProps | null;
  padron: null | CiudadanoCajaProps | EmpresaCajaProps | ContribuyenteCajaProps;
  ladas: null | LadaProps[];
}

const pagosDiversosSlide = createSlice<
PagosDiversosStateProps,
SliceCaseReducers<PagosDiversosStateProps>,
string
>({
  name: 'pagos diversos',
  initialState: {
    tipoDePadron: null,
    padron: null,
    ladas: null,
  },
  reducers: {
    setTipoDePadron: (state, action: PayloadAction<PadronProps | null>) => {
      state.tipoDePadron = action.payload;
    },
    setPadron: (state, action: PayloadAction<PagosDiversosStateProps['padron']>) => {
      state.padron = action.payload;
    },
    setLadas: (state, action: PayloadAction<LadaProps[]>) => {
      state.ladas = action.payload;
    },
  },
});

export const { setTipoDePadron, setPadron, setLadas } = pagosDiversosSlide.actions;
export default pagosDiversosSlide.reducer;
