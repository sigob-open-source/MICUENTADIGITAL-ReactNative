import { AxiosError } from 'axios';
import { useContext } from 'react';
import DropdownalertContext from '../context/Dropdownalert';
import { AlertNotification } from '../types/alert';
import { CommonResponse, ApiError } from '../types/api';

const useDropdownAlert = () => {
  const { notification, setNotification } = useContext(DropdownalertContext);

  const notify = (config: AlertNotification) => {
    if (notification === null) {
      setNotification(config);
    }
  };

  const clear = () => {
    setNotification(null);
  };

  const errorHandler = (error: ApiError) => {
    let message = 'Algo salió mal';

    if (__DEV__ && Object.prototype.hasOwnProperty.call(error, 'stack')) {
      message = error.message;
    } else if ((error as AxiosError<CommonResponse>).response?.data?.message) {
      message = (error as AxiosError<CommonResponse>).response?.data.message as string;
    } else if (error.message && !Object.prototype.hasOwnProperty.call(error, 'stack')) {
      message = error.message;
    }

    notify({
      message,
      type: 'error',
      title: 'Error',
    });
  };

  return {
    notification,
    notify,
    errorHandler,
    clear,
  };
};

export {
  useDropdownAlert,
};
