import { Dimensions, Platform, StatusBar } from 'react-native';

const { OS } = Platform;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const KEYBOARD_SHOW_EVENT = OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
const KEYBOARD_HIDE_EVENT = OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

const PADRONES_PAGOS_DIVERSOS = Object.freeze({
  CIUDADANO: 1,
  EMPRESA: 2,
  CONTRIBUYENTE: 15,
});

export {
  KEYBOARD_HIDE_EVENT,
  KEYBOARD_SHOW_EVENT,
  OS,
  PADRONES_PAGOS_DIVERSOS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
};
