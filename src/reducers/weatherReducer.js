import { UPDATE_LAT_LONG, UPDATE_WEATHERDESC_TEMP, UPDATE_LOCATION, ADD_ERROR, CLEAR_ERROR } from '../constants/action-types';

const initialState = {
  latitude: 0,
  longitude: 0,
  errors: ["error 1", "error 2"],
  locationCode: 0,
  locationName: "",
  weatherDesc: "",
  temperature: 0,
  date: new Date()
};

const weatherReducer = (state = initialState, action) => {
 switch (action.type) {
  case UPDATE_LAT_LONG:
    return { ...state, latitude: action.payload.latitude, longitude: action.payload.longitude };
  case UPDATE_WEATHERDESC_TEMP:
    return { ...state, weatherDesc: action.payload.weatherDesc, temperature: action.payload.temperature };
  case UPDATE_LOCATION:
    return { ...state, locationCode: action.payload.locationCode, locationName: action.payload.locationName };
  case ADD_ERROR:
    return { ...state, errors: [...state.errors, action.payload] };
  case CLEAR_ERROR:
    return { ...state, errors: [] };
  default:
    return state;
 } 
};

export default weatherReducer;