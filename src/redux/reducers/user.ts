import { AnyAction } from 'redux';

export const INITIAL_STATE = {
  email: '',
  password: '',
};

export type LoginState = {
  email: string,
  password: string,
};

const user = (state = INITIAL_STATE, action: AnyAction): LoginState => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default user;
