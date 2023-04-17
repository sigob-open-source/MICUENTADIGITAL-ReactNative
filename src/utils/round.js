const tiposDeRedondeos = {
  CONVENCIONAL: 1,
  SIEMPRE_A_PESO_SUPERIOR: 2,
  SIEMPRE_A_PESO_INFERIOR: 3,
};

/** Round
 * @param {number} _val
 * @returns [] [val, rounded]
 */
const round = (_val) => {
  if (!_val) {
    return [null];
  }
  const utilizar_redondeo = true;
  const tipo_de_redondeo = tiposDeRedondeos.SIEMPRE_A_PESO_SUPERIOR;
  const initialVal = +_val.toFixed(2) || 0;
  let val = initialVal;
  if (utilizar_redondeo) {
    if (tipo_de_redondeo === tiposDeRedondeos.CONVENCIONAL) {
      const decimales = _val - Math.floor(_val);
      if (decimales <= 0.5) {
        val = Math.floor(val);
      } else {
        val = Math.ceil(val);
      }
    }
    if (tipo_de_redondeo === tiposDeRedondeos.SIEMPRE_A_PESO_SUPERIOR) {
      val = Math.ceil(val);
    }
    if (tipo_de_redondeo === tiposDeRedondeos.SIEMPRE_A_PESO_INFERIOR) {
      val = Math.floor(val);
    }
  }
  const preRound = +parseFloat(val - initialVal).toFixed(2);
  const rounded = preRound < 0 ? -preRound : preRound;
  return [val, rounded];
};

export default round;
