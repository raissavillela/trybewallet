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
