import { UPDATE_WEATHERDESC_TEMP, UPDATE_LAT_LONG, UPDATE_LOCATION, SET_CURRENT_DATE, ADD_ERROR, CLEAR_ERROR } from '../constants/action-types';

export const updateWeatherDescTemp = (weatherDesc, temperature) => ({ type: UPDATE_WEATHERDESC_TEMP, payload: weatherDesc, temperature });
export const updateLatLong = (latitude, longitude) => ({ type: UPDATE_LAT_LONG, payload: latitude, longitude });
export const updateLocation = (locationCode, locationName) => ({ type: UPDATE_LOCATION, payload: locationCode, locationName });
export const setCurrentDate = date => ({ type: SET_CURRENT_DATE, payload: date });
export const addError = error => ({ type: ADD_ERROR, payload: error });
export const clearError = error => ({ type: CLEAR_ERROR, payload: error });
