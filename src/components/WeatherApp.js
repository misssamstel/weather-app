import React from 'react'
import ReactDOM from 'react-dom'
import store from '../store/weatherStore'
import { Provider } from 'react-redux'
import Header from './Header'
import Weather from './Weather'
import FiveDayWeather from './FiveDayWeather'

export default class WeatherApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          {/* <Header /> */}
          <div className='weather-container'>
            {/* <Weather /> */}
            <FiveDayWeather />
          </div>
        </div>
      </Provider>
    )
  }
}
