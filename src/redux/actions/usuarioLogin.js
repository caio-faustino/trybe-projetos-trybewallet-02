export const LOGIN_USER = 'LOGIN_USER';

export const usuarioLogin = (payload) => {
  console.log(payload);
  return {
    type: LOGIN_USER,
    payload,
  };
};