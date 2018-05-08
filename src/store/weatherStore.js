import { createStore } from 'redux';
import rootReducer from '../reducers/weatherReducer';

const store = createStore(rootReducer);

export default store;