import Moment, { Moment as MomentInstance } from 'moment';

// Constants
const FORMAT = 'DD/MM/YYYY';

/**
 * Reduce o aumenta dias dependiendo de la fecha
 */
const plusOrRestDays = (date: MomentInstance) => {
  const currentMonth = Moment().month();
  let output = date;
  if (output.month() !== currentMonth) {
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
type Day = '0' | '1' | '2' | '3' | '4' | '5' | '6';
type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
/**
 * Obtiene una fecha arbitraria de el mes que se le indique (Ejemplo: el tercer lunes de Mayo)
 * @param {number} times
 * @param {string} day
 * @param {string} month
 * @returns {string} date
 */
const getRelativeFeriado = (times = 1, day: Day = '1', month: Month = '01') => {
  const currentYear = Moment().year();
  const dateEntered = `01/${month}/${currentYear}`;
  const momentInstance = Moment(dateEntered, FORMAT);
  const startOfMonth = momentInstance.startOf('month');
  let days = 0;
  while (days < times && days <= 30) {
    startOfMonth.add(1, 'day');
    if (startOfMonth.format('d') === day) {
      days += 1;
    }
  }
  const output = startOfMonth.format(FORMAT);
  return output;
};

/** Obtiene la fecha de expiracion de la orden de pago
 */
const getExpiryDate = (tipoDePadron: number, format = 'YYYY/MM/DD') => {
  const currentDate = Moment();
  // Lista para excluir los días feriados
  const diasFeriados = [
    `01/01/${currentDate.year()}`,
    `16/09/${currentDate.year()}`,
    `01/05/${currentDate.year()}`,
    `25/12/${currentDate.year()}`,
    getRelativeFeriado(3, '1', '11'), // 3er lunes de noviembre
    getRelativeFeriado(3, '1', '03'), // 3er lunes de marzo
    getRelativeFeriado(1, '1', '02'), // 1er lunes de febrero
  ];
  let output = currentDate;
  const padronesCon17Dias = [7, 10];
  const vigencyDays = padronesCon17Dias.includes(tipoDePadron) ? 17 : 10;
  const currentDay = currentDate.day();
  const dayToAdd = vigencyDays - currentDay;
  /**
   *  Si la orden de pago se genera en los primeros 10 o 17 (Dependiendo del padron) días del mes,
   * la vigencia de la orden de pago será hasta el día 10 o 17 del mismo mes.
   * Si la orden de pago se genera después del día 10 o 17 del mes,
   * la vigencia de la orden de pago será hasta el día hasta el ultimo dia del mes.
   */
  if (currentDay < vigencyDays) {
    output = Moment().add(dayToAdd, 'days');
  } else {
    const endOfMonth = parseInt(currentDate.endOf('month').fromNow().split(' ')[1], 10);
    output = Moment().add(endOfMonth, 'days');
  }
  // Si la vigencia excede el mes actual y es un fin de semana, se extiende hasta el lunes siguiente
  // Si la vigencia excede el mes actual, se reduce hasta el día hábil mas cercano
  output = plusOrRestDays(output);
  output = plusOrRestDays(output);

  if (diasFeriados.includes(output.format(FORMAT))) {
    output = output.add(1, 'days');
    output = plusOrRestDays(output);
    output = plusOrRestDays(output);
  }

  return output.format(format);
};

export default getExpiryDate;
