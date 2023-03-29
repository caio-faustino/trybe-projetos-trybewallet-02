// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_USER } from '../actions/usuarioLogin';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    console.log(action.payload);
    return {
      ...action.payload,
    };
  default:
    return state;
  }
};

export default user;