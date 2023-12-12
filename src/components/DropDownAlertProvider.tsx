// External dependenices
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import DropdownAlert from 'react-native-dropdownalert';

// Internal dependenices
import { AlertNotification } from '../types/alert';

// Types & Interfaces
type TNotification = AlertNotification | null;

interface IDropdownAlertContextProps {
  notification: TNotification;
  setNotification: (message: TNotification)=> void;
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

const DropDownAlertProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [notification, setNotification] = useState<TNotification>(null);

  const dropdownalert = useRef<DropdownAlert>(null);

  useEffect(() => {
    if (notification) {
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
export default DropDownAlertProvider;
