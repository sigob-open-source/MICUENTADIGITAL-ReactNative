import React from 'react';

import { AlertNotification } from '../types/alert';

interface DropdownalertContextProps {
  notification: AlertNotification | null;
  setNotification: (notification: AlertNotification | null) => void;
}

const DropdownalertContext = React.createContext<DropdownalertContextProps>({
  notification: null,
  setNotification: () => {},
});

export default DropdownalertContext;
