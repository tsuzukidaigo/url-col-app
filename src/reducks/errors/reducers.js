import * as Actions from './actions';
import initialState from '../store/initialState';

export const ErrorsReducer = (state = initialState.errors, action) => {
  switch (action.type) {
    case Actions.ERROR_EMAIL:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ERROR_PASSWORD:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
