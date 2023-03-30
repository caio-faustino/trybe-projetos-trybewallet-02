// Requisito

// 07

import { EDIT_EXPENSE, ADD_EXPENSE, UPDATE_EXPENSE, REQUEST_CURRENCIES,
} from '../actions/acoesWallet';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  idToEdit: 0,
  editor: false,

};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EDIT_EXPENSE:
    return { ...state, editor: action.isEditing, idToEdit: action.id };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.amount] };

  case UPDATE_EXPENSE:
    return { ...state, expenses: [...action.amount] };
  case REQUEST_CURRENCIES:
    return { ...state, currencies: action.amount };

  default:
    return state;
  }
}

export default wallet;
