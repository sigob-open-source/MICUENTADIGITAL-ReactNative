import http from './http';

const getPadrones = async () => {
  await http.get('catalogos/padrones/').then(
    (response) => {
      const result = response.data;
      console.log(result);
      return result;
    },
    (error) => {
      console.log(error);
    },
  );
};

export default getPadrones;
