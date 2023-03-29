import { fetchCurrencies } from '../acessoAPI';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

function requestCurrencies(currencies) {
  return {
    type: REQUEST_CURRENCIES,
    payload: currencies,
  };
}

export function addExpense(expense) {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
}

export function fetchCurrenciesToGlobal() {
  return async (dispatch) => {
    const data = await fetchCurrencies();
    const tempSet = new Set(Object.keys(data));
    console.log(tempSet);
    tempSet.delete('USDT');
    return dispatch(requestCurrencies([...tempSet]));
  };
}