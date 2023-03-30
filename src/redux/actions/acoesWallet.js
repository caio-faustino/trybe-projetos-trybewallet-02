import { fetchCurrencies } from '../acessoAPI';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

function requestCurrencies(currencies) {
  return {
    type: REQUEST_CURRENCIES,
    amount: currencies,
  };
}

export function addExpense(expense) {
  return {
    type: ADD_EXPENSE,
    amount: expense,
  };
}

export function updateExpense(expenses) {
  return {
    type: UPDATE_EXPENSE,
    amount: expenses,
  };
}

export function editExpense(id, isEditing) {
  return {
    type: EDIT_EXPENSE,
    id,
    isEditing,
  };
}

export function fetchCurrenciesToGlobal() {
  return async (dispatch) => {
    const data = await fetchCurrencies();
    const tempSet = new Set(Object.keys(data));
    tempSet.delete('USDT');
    return dispatch(requestCurrencies([...tempSet]));
  };
}
