import Moment from 'moment';
import { DECIMAL_PATTERN, INTEGER_PATTERN } from './patterns';

Moment.defaultFormat = 'DD/MM/YYYY';

/**
 * Format to Currency
 * @param {string|number} value
 * @param {boolean} withoutCurrencySymbol
 * @returns string
 */
export const toCurrency = (value, withoutCurrencySymbol = false) => {
  let val = value;
  if (typeof val !== 'number') {
    val = 0;
  }

  const output = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
  }).format(value);

  if (withoutCurrencySymbol) {
    return output.replace('$', '');
  }

  return output;
};

/**
 * Format to Upper
 * @param {string} val
 * @returns string
 */
export const toUpper = (val = '') => val?.toUpperCase();

/**
 * Format to Upper
 * @param {string|Date} val
 * @returns {Moment}
 */
export const toMoment = (val = '') => new Moment(val);

/**
 * Format to Integer
 * @param {string} val
 * @returns number|null
 */
export const toInteger = (val) => parseInt(val.replace(/[^0-9]+/g, '') || 0, 10) || null;

/**
 * Format to Integer
 * @param {string} val
 * @returns number|null
 */
export const decimalNormalizer = (_val = '') => {
  if (DECIMAL_PATTERN.test(_val)) {
    return _val;
  }
  if (parseFloat(_val)) {
    return parseFloat(_val);
  }
  const val = _val.toString();
  const normalized = val.replace(INTEGER_PATTERN, '');
  const includeDot = val[val.length - 1] === '.';
  return includeDot ? normalized.concat('.') : parseInt(normalized, 10);
};

/**
 * List Formatter
 * @param {string[]} list
 * @param {'conjunction'|'disjunction'} type
 * @returns
 */
export const listToString = (
  list,
  type = 'conjunction',
) => new Intl.ListFormat('es-MX', { type }).format(list);

/**
 * Normalizer
 * @param {string} val
 * @returns string
 */
export const normalizeValue = (val) => val.toString()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/**
 * Titleizer
 * @param {string} val
 * @returns string
 */
export const titleize = (val) => {
  if (val) {
    return `${val[0].toUpperCase()}${val.substring(1)}`;
  }
  return '';
};

/**
 * Humanizer
 * @param {string} val
 * @returns string
 */
export const humanizeString = (string, _titleize = false) => {
  const splitted = string.split('/');
  const huminized = splitted[splitted.length - 1]
    .toLowerCase().replace(/[_-]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  if (_titleize) {
    return titleize(huminized);
  }
  return huminized;
};

/**
 * Spaces remover
 * @param {string} val
 * @returns string
 */
export const noSpaces = (val) => val?.replace(/\s/g, '');