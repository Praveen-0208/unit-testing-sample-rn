import {combineReducers, createStore} from 'redux';
import loginReducer from './reducers/loginReducer';

const rootReducer = combineReducers({
  loginReducer,
});

const store = createStore(rootReducer);

export default store;
