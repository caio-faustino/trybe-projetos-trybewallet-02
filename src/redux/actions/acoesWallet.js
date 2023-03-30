import { fetchCurrencies } from '../acessoAPI';


export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';



export function accDespesa(expense) {
  return {
    type: ADD_EXPENSE,
    amount: expense,
  };
}

function requisitaMoeda(moedas) {
  return {
    type: REQUEST_CURRENCIES,
    amount: moedas,
  };
}



export function atualizaDespesas(expenses) {
  return {
    type: UPDATE_EXPENSE,
    amount: expenses,
  };
}

export function accDespesaNoTotal() {
  return async (dispatch) => {
    const currenciesData = await fetchCurrencies();
    const currenciesSet = new Set(Object.keys(currenciesData));
    currenciesSet.delete('USDT');
    return dispatch(requisitaMoeda([...currenciesSet]));
  };
}



export function edtDespesas(id, isEditing) {
  return {
    type: EDIT_EXPENSE, id, isEditing,
  };
}

