import { Dimensions, Platform, StatusBar } from 'react-native';

const OS = Platform.OS;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

const KEYBOARD_SHOW_EVENT = OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
const KEYBOARD_HIDE_EVENT = OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

export {
  OS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  KEYBOARD_SHOW_EVENT,
  KEYBOARD_HIDE_EVENT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
};
