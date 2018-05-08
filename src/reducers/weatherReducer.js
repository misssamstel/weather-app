import { UPDATE_WEATHER_INFO } from '../constants/action-types';

const initialState = {
  temperature: [
    {id: 1, title: 'testy1'},
    {id: 2, title: 'testy2'}
  ]
};

const weatherReducer = (state = initialState, action) => {
 switch (action.type) {
  case UPDATE_WEATHER_INFO:
    return { ...state, temperature: [...state.temperature, action.payload] };
  default:
    return state;
 } 
};

export default weatherReducer;