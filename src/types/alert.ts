import { DropdownAlertType } from 'react-native-dropdownalert';

interface AlertNotification {
  type: DropdownAlertType;
  title: string;
  message: string;
}

export type {
  AlertNotification,
};
