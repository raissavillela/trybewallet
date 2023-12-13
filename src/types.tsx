import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { WalletState, Expense } from './redux/reducers/wallet';

export type RootState = {
  user: {
    email: string;
  };
  wallet: WalletState;
  currencies: string[];
};
export type Dispatch = ThunkDispatch<RootState, void, Action>;

export type InputType = {
  email: string,
  password: string
};

export type GlobalState = {
  user: InputType,
  wallet: WalletState,
};

export type WalletType = {
  currencies: [],
  expenses: Expense[],
  editor: boolean,
  idToEdit: number,
};
