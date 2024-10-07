import { AnyAction } from 'redux';
import { ADD_EXPENSE, DELETE_EXPENSE,
  RECEIVE_DATA_SUCCESS, REQUEST_DATA } from '../actions';
import { WalletType } from '../../type';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state:WalletType = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_DATA: {
      return {
        ...state,
      };
    }
    case RECEIVE_DATA_SUCCESS: {
      const currenciesArray = Object.keys(action.payload)
        .filter((coin) => coin !== 'USDT');

      return {
        ...state,
        currencies: currenciesArray,
      };
    }
    case ADD_EXPENSE: {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    }
    case DELETE_EXPENSE: {
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default walletReducer;
