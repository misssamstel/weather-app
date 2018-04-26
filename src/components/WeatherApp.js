import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Weather from './Weather'

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: "WeatherApp",
      latitude: 0,
      longitude: 0,
      error: null
    }
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
  }

  success = position => {
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;
    this.setState({
      currentLocation: `Latitude is ${latitude} & Longitude is ${longitude}`,
      latitude: latitude,
      longitude: longitude
    });
    console.log(this.state.latitude)
  }

  error = () => {
    this.setState({
      error: "Unable to retrieve your location"
    });
  }

  getCurrentLocation = () => {
     if (!navigator.geolocation){
      this.setState({
        error: "Geolocation is not supported by your browser"
      });
      return;
    }
    this.setState({
      currentLocation: "Loading..."
    });
    navigator.geolocation.getCurrentPosition(this.success, this.error);
  }
  componentDidMount() {
    this.getCurrentLocation();
  }
  render() {
    return (
      <div>
          <Header currentLocation={this.state.currentLocation}/>
          <Weather latitude={this.state.latitude} longitude={this.state.longitude}/>
          <div>
            <p>{this.state.currentLocation}</p>
            {this.state.error && <p>{this.state.error}</p>}
          </div>
      </div>
    )
  }
}
