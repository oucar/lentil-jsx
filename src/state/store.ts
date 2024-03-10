import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from './reducers';


const thunkMiddleware: any = thunk;

export const store = createStore(reducers, {}, applyMiddleware(thunkMiddleware));