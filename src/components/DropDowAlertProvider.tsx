import React, {
  createContext,
  ReactElement,
  useContext,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { AlertNotification } from '../types/alert';

type TNotification = AlertNotification | null;

interface IDropdownAlertContextProps {
  notification: TNotification;
  setNotification: (message: TNotification)=> void;
}

interface IDropdownAlertProviderProps {
  children: ReactElement;
}

const DropdownAlertContext = createContext<IDropdownAlertContextProps>({
  notification: null,
  setNotification: () => {},
});

const useNotification = () => {
  const { notification, setNotification } = useContext(DropdownAlertContext);
  const notify = (props: AlertNotification) => {
    if (!notification) {
      setNotification(props);
    }
  };
  return notify;
};

const DropdownalertProvider = ({ children }: IDropdownAlertProviderProps) => {
  const [notification, setNotification] = useState<TNotification>(null);

  const dropdownalert = useRef<DropdownAlert>(null);

  useEffect(() => {
    if (notification) {
      //console.log('log de Notificacion', notification);

      dropdownalert.current?.alertWithType?.(
        notification.type,
        notification.title,
        notification.message,
      );
    }
  }, [notification]);

  const providerValue = useMemo(
    () => (
      { notification, setNotification }),
    [notification, setNotification],
  );

  return (
    <DropdownAlertContext.Provider value={providerValue}>
      {children}

      <DropdownAlert
        ref={dropdownalert}
        onClose={() => setNotification(null)}
        updateStatusBar={false}
      />
    </DropdownAlertContext.Provider>
  );
};

export { useNotification };
export default DropdownalertProvider;
