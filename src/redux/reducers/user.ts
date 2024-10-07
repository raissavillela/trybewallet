import { AnyAction } from 'redux';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
}

export default user;
