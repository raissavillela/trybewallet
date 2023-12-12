import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { WalletState } from './redux/reducers/wallet';

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

export type TotalExpensesType = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: { [key: string]: { ask: string; name?: string } },
};

export type WalletType = {
  currencies: [],
  expenses: TotalExpensesType[],
  editor: boolean,
  idToEdit: number,
};
