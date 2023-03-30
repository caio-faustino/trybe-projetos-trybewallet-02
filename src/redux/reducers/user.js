import { LOGIN_USER } from '../actions/usuarioLogin';

const INITIAL_STATE = { email: '' };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return { ...action.amount };
  default: return state;
  }
};

export default user;
