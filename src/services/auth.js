import { HTTP } from './http';

const login = async (email, password) => {
  try {
    const response = await HTTP.post('usuarios/login/', {
      email,
      password,
    });
    return response?.data?.access ? response?.data : null;
  } catch (error) {
    console.error(error, error?.response?.data?.detail);
  }
  return null;
};

export { login };
