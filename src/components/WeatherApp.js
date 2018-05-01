import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Weather from './Weather'

export default class WeatherApp extends React.Component {
  render() {
    return (
      <div>
        {/* <Header currentLocation={this.state.currentLocation}/> */}
        <Weather />
      </div>
    )
  }
}
