export const ERROR_EMAIL = 'ERROR_EMAIL';
export const errorEmailAction = (error) => {
  return {
    type: 'ERROR_EMAIL',
    payload: error,
  };
};
export const ERROR_PASSWORD = 'ERROR_PASSWORD';
export const errorPasswordAction = (error) => {
  return {
    type: 'ERROR_PASSWORD',
    payload: error,
  };
};
