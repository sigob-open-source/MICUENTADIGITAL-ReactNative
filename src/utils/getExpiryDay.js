import Moment from 'moment';

const toMoment = (val = '') => Moment(val);
const currentDate = toMoment(new Date()).format('DD-MM-YYYY');
const [currentDay, currentMonth, currentYear] = currentDate.split('-');

/**
 * Reduce o aumenta dias dependiendo de la fecha
 * @param {String} _date
 * @returns {String} date
 */
const plusOrRestDays = (_date) => {
  let output = _date;
  if (output.format('MM') !== currentMonth) {
    output = output.subtract(1, 'days');
    if (output.format('dddd') === 'Sunday') {
      output = output.subtract(2, 'days');
    }
    if (output.format('dddd') === 'Saturday') {
      output = output.subtract(2, 'days');
    }
  } else {
    if (output.format('dddd') === 'Sunday') {
      output = output.add(1, 'days');
    }
    if (output.format('dddd') === 'Saturday') {
      output = output.add(2, 'days');
    }
  }
  return output;
};
/*
Domingo    -> 0
Lunes      -> 1
Martes     -> 2
Miércoles  -> 3
Jueves     -> 4
Viernes    -> 5
Sábado     -> 6
*/

/**
 * Obtiene una fecha arbitraria de el mes que se le indique (Ejemplo: el tercer lunes de Mayo)
 * @param {number} times
 * @param {string} day
 * @param {string} month
 * @returns {string} date
 */
const getRelativeFeriado = (times = 1, day = '1', month = '01') => {
  const momentInstance = new Moment(Moment(`1-${month}-${currentYear}`).format('DD-MM-YYYY'));
  const startOfMonth = Moment(momentInstance).startOf('month');
  const days = [];
  while (startOfMonth.format('d') !== day || days.length < times) {
    startOfMonth.add(1, 'day');
    if (startOfMonth.format('dddd') === 'Monday') {
      days.push(startOfMonth.format('dddd'));
    }
  }
  return startOfMonth.format('DD-MM-YYYY');
};

/** Obtiene la fecha de expiracion de la orden de pago
 * @param {number} tipo_de_padron
 * @param {string} format
 * @returns {string} fecha de vencimiento
 */
export default (tipo_de_padron, format = 'YYYY/MM/DD') => {
  // Lista para excluir los días feriados
  const diasFeriados = [
    `01-01-${currentYear}`,
    `16-09-${currentYear}`,
    `01-05-${currentYear}`,
    `25-12-${currentYear}`,
    `01-05-${currentYear}`,
    getRelativeFeriado(3, '1', '11'), // 3er lunes de noviembre
    getRelativeFeriado(3, '1', '03'), // 3er lunes de marzo
    getRelativeFeriado(1, '1', '02'), // 1er lunes de febrero
  ];
  let output = currentDate;
  const padronesCon17Dias = [7, 10];
  const vigencyDays = padronesCon17Dias.includes(tipo_de_padron) ? 17 : 10;
  const dayToAdd = vigencyDays - currentDay;
  /**
   *  Si la orden de pago se genera en los primeros 10 o 17 (Dependiendo del padron) días del mes,
   * la vigencia de la orden de pago será hasta el día 10 o 17 del mismo mes.
   * Si la orden de pago se genera después del día 10 o 17 del mes,
   * la vigencia de la orden de pago será hasta el día hasta el ultimo dia del mes.
   */
  if (currentDay < vigencyDays) {
    output = toMoment(new Date()).add(dayToAdd, 'days');
  } else {
    const endOfMonth = parseInt(toMoment(new Date()).endOf('month').fromNow().split(' ')[1], 10);
    output = toMoment(new Date()).add(endOfMonth, 'days');
  }
  // Si la vigencia excede el mes actual y es un fin de semana, se extiende hasta el lunes siguiente
  // Si la vigencia excede el mes actual, se reduce hasta el día hábil mas cercano
  output = plusOrRestDays(output);
  output = plusOrRestDays(output);

  if (diasFeriados.includes(output.format('DD-MM-YYYY'))) {
    output = output.add(1, 'days');
    output = plusOrRestDays(output);
    output = plusOrRestDays(output);
  }
  return output.format(format);
};