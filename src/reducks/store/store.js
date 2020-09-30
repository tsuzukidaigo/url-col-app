import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { UsersReducer } from '../users/reducers';
import { ErrorsReducer } from '../errors/reducers';

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      errors: ErrorsReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
