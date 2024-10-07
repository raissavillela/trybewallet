import getCurriencies from '../../services/currenciesAPI';
import { AppDispatch } from '../../type';

export const setUser = (email: string) => ({
  type: 'USER',
  payload: email,
});

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA_SUCCESS = 'RECEIVE_DATA_SUCCESS';
export const RECEIVE_DATA_ERROR = 'RECEIVE_DATA_ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

//  essa action é disparada quando vou fazer a requisição pra API
export const fetchDataRequest = () => ({
  type: REQUEST_DATA,
});

//  essa action é disparada quando o retorno da API for de sucesso
export const fetchDataSuccess = (code: string) => ({
  type: RECEIVE_DATA_SUCCESS,
  payload: code,
});

//  essa action é disparada quando o retorno da API for de erro
export const fetchDataError = () => ({
  type: RECEIVE_DATA_ERROR,
});

export const addExpense = (expenses: any) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});

export const deleteExpense = (id:number) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const actionFetchApi = (form?: any) => {
  // O parametro dispatch é fornecido pelo thunk, resolve a requisição e enviar o resultado pro reducer
  return async (dispatch: AppDispatch) => {
  // disapra a ação q indica que será feita a requisição API
    dispatch(fetchDataRequest());
    try {
      // realizar requisição pra API
      // dispara action sucesso
      const result = await getCurriencies();
      if (form) {
        const expense = { ...form, exchangeRates: result };
        dispatch(addExpense(expense));
      } else {
        dispatch(fetchDataSuccess(result));
      }
    } catch (error) {
      // dispara action erro
      dispatch(fetchDataError());
    }
  };
};
