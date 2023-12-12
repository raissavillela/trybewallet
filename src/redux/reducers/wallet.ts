import { AnyAction } from 'redux';

export type Expense = {
  id: number;
  wallet: any;
  description: string;
  value: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates?: {
    [chave:string]:{
      ask: string
    },
  },
};

export type WalletState = {
  expenses: Expense[];
  currencies: string[];
  exchangeRates: {
    [chave:string]:{
      ask: string
    },
  },

};

export const INITIAL_STATE: WalletState = {
  expenses: [],
  currencies: [],
  exchangeRates: {},
};

function wallet(state = INITIAL_STATE, action: AnyAction) : WalletState {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case 'FETCH_CURRENCIES_SUCCESS':
      return {
        ...state,
        currencies: action.payload,
      };
    default:
      return state;
  }
}
export default wallet;
