import * as Actions from './actions';
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.SIGN_OUT:
      return {
        ...action.payload,
      };
    case Actions.FETCH_DIRECTORY:
      return {
        ...state,
        directoryList: [...action.payload],
      };
    case Actions.DELETE_DIRECTORY:
      return {
        ...state,
        directoryList: [...action.payload],
      };
    case Actions.FETCH_URLINFO:
      return {
        ...state,
        urlList: [...action.payload],
      };
    case Actions.DELETE_URLINFO:
      return {
        ...state,
        urlList: [...action.payload],
      };
    default:
      return state;
  }
};
