import { ThunkAction } from 'redux-thunk';
import { Expense } from '../reducers/wallet';
import { Dispatch, RootState } from '../../types';

export const SET_EMAIL = 'SET_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_EXPENSE_ACTION_ID = 'ADD_EXPENSE_ACTION_ID';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const setEmail = (email: string) => ({
  type: SET_EMAIL,
  payload: email,
});
export const addExpense = (currencies: Expense) => ({
  type: ADD_EXPENSE,
  payload: currencies,
});

export const addExpenseRates = (expenses: any) => async (dispatch : Dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const filteredCurrencies = data;

    dispatch(addExpense({ ...expenses, exchangeRates: filteredCurrencies }));
  } catch (error) {
    console.error('Erro ao buscar moedas:', error);
  }
};

export type AsyncAction<R = void> = ThunkAction<Promise<R>, RootState, unknown, any>;

export const fetchCurrencies = (): AsyncAction => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const filteredCurrencies = Object
      .keys(data).filter((currency) => currency !== 'USDT');

    dispatch(fetchCurrenciesSuccess(filteredCurrencies));
  } catch (error) {
    console.error('Erro ao buscar moedas:', error);
  }
};

export const fetchCurrenciesSuccess = (currencies: string[]) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  payload: currencies,
});

export const deleteExpenses = (id: number) => ({
  type: DELETE_EXPENSES,
  payload: id,
});
