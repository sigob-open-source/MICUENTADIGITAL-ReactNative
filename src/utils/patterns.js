export const RFC_PATTERN = /^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)(\w{2})([A|a|0-9]{1}))$|^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$/;
export const CURP_PATTERN = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
export const DECIMAL_PATTERN = /^(\d)*(\.\d{1,2})?$/;
export const INTEGER_PATTERN = /^\d+$/;
export const PHONE_NUMBER = /[0-9]{10}/;

const digitoVerificador = (curp17) => {
  const dict = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  let lngSuma = 0;
  let lngDigito = 0;
  for (let i = 0; i < 17; i += 1) {
    lngSuma += dict.indexOf(curp17.charAt(i)) * (18 - i);
  }
  lngDigito = 10 - (lngSuma % 10);
  if (lngDigito === 10) {
    return 0;
  }
  return lngDigito.toString();
};

export const CURP_VALIDATOR = {
  validator: async (_, value) => {
    if (value) {
      const validado = value.toUpperCase().match(CURP_PATTERN);
      if (!validado || validado[2] !== digitoVerificador(validado[1])) {
        throw new Error('Ingrese una CURP válida');
      }
    }
  },
};

export const RFC_VALIDATOR = (tipoDePersona) => ({
  validator: async (rule, _value) => {
    if (_value) {
      const value = _value.toString().toUpperCase();
      if (!RFC_PATTERN.test(value) || value.length !== (tipoDePersona === 1 ? 13 : 12)) {
        throw new Error('Ingrese un RFC válido');
      }
    }
  },
});