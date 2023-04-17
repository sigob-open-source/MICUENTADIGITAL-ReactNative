/* eslint-disable no-param-reassign */
// External dependencies
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

// Internal dependencies
import { PadronProps } from '../../services/catalogos/padrones.types';
import { CiudadanoCajaProps } from '../../services/cuentaunicasir/ciudadano-types';
import { EmpresaCajaProps } from '../../services/cuentaunicasir/empresa-types';
import { ContribuyenteCajaProps } from '../../services/empresas/contribuyentes-caja-public-types';
import { CargoWithChildren } from '../../services/recaudacion/generar-cargos.types';
import { TipoDeCargo, VariableProps } from '../../services/recaudacion/tipos-de-cargos.types';
import { LadaProps } from '../../services/usuarios/lada.types';

// Types & Interfaces
type VariableWithValue = VariableProps & { value: string };
interface CartItem {
  tipoDeCargo: TipoDeCargo;
  variables: VariableWithValue[];
  cantidad: number;
}
export interface PagosDiversosStateProps {
  tipoDePadron: PadronProps | null;
  padron: null | CiudadanoCajaProps | EmpresaCajaProps | ContribuyenteCajaProps;
  ladas: null | LadaProps[];
  cart: CartItem[];
  cargos: CargoWithChildren[];
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
    cart: [],
    cargos: [],
  },
  reducers: {
    clear: (state) => {
      state.tipoDePadron = null;
      state.padron = null;
      state.ladas = null;
      state.cart = [];
      state.cargos = [];
    },
    setTipoDePadron: (state, action: PayloadAction<PadronProps | null>) => {
      state.tipoDePadron = action.payload;
    },
    setPadron: (state, action: PayloadAction<PagosDiversosStateProps['padron']>) => {
      state.padron = action.payload;
    },
    setLadas: (state, action: PayloadAction<LadaProps[]>) => {
      state.ladas = action.payload;
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
    setCargos: (state, action: PayloadAction<CargoWithChildren[]>) => {
      state.cargos = action.payload;
    },
  },
});

export const {
  clear,
  setTipoDePadron,
  setPadron,
  setLadas,
  setCart,
  setCargos,
} = pagosDiversosSlide.actions;
export default pagosDiversosSlide.reducer;
