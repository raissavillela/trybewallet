import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type GlobalStateType = {
  user: {
    email: string,
  },
  wallet: {
    currencies: string[],
    expenses: FormType[],
    editor: boolean,
    idToEdit: number,
  }
};

export type AppDispatch = ThunkDispatch<GlobalStateType, void, AnyAction>;

export type FormType = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: any,
};

export type WalletType = {
  currencies: string[],
  expenses: FormType[],
  editor: boolean,
  idToEdit: number,
};
