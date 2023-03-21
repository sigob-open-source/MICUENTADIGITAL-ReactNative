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
  OS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  KEYBOARD_SHOW_EVENT,
  KEYBOARD_HIDE_EVENT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  STATUS_BAR_HEIGHT,
  PADRONES_PAGOS_DIVERSOS,
};
