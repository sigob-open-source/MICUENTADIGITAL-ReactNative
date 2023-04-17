/* eslint-disable no-param-reassign */
// External dependencies
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { ICiudadano } from '../../services/cuentaunicasir/auth.types';

// Internal dependencies

// Types & Interfaces
interface IAuthStateProps {
  access: string | null;
  ciudadano: ICiudadano | null;
}

const authSlide = createSlice<IAuthStateProps, SliceCaseReducers<IAuthStateProps>, string>({
  name: 'auth',
  initialState: {
    access: null,
    ciudadano: null,
  },
  reducers: {
    clearAuth: (state) => {
      state.access = null;
      state.ciudadano = null;
    },
    setAuthInformation: (
      state,
      action: PayloadAction<{ access: string, ciudadano: ICiudadano }>,
    ) => {
      state.access = action.payload.access;
      state.ciudadano = action.payload.ciudadano;
    },
    updateCiudadano: (state, action: PayloadAction<ICiudadano>) => {
      state.ciudadano = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
    },
  },
});

export const {
  clearAuth,
  setAuthInformation,
  updateCiudadano,
  updateToken,
} = authSlide.actions;
export default authSlide.reducer;
