import { UPDATE_WEATHER_INFO } from '../constants/action-types';

export const updateWeatherInfo = weather => ({ type: UPDATE_WEATHER_INFO, payload: weather });