import React from 'react';
import axios from 'axios';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationCode: 0
    }
    this.weatherAPI = {
      baseURL: 'http://dataservice.accuweather.com',
      apiKey: 'VLYBIQ48eBl4bYVrrwbsbu1h7GguIaAC',
      currentWeatherURL: 'currentconditions/v1',
      geopositionSearchURL: 'locations/v1/cities/geoposition/search'
    };
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getCurrentLocationCode = this.getCurrentLocationCode.bind(this);
  }
  
  getCurrentWeather = () => {
    axios.get(`${this.weatherAPI.baseURL}/${this.weatherAPI.currentWeatherURL}/${this.state.locationCode}`, {
      params: {
        apikey: this.weatherAPI.apiKey,
        details: false
      }
    })
    .then((res) => {
      let data = res.data[0];
      let temperature = data.Temperature.Metric.Value;
      let weatherDesc = data.WeatherText;
      console.log(weatherDesc);
      console.log(`It is ${temperature}°C`);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  getCurrentLocationCode = () => {
    axios.get(`${this.weatherAPI.baseURL}/${this.weatherAPI.geopositionSearchURL}`, {
      params: {
        apikey: this.weatherAPI.apiKey,
        q: `${this.props.latitude},${this.props.longitude}`,
        language: 'ja-jp'
      }
    })
    .then((res) => {
      let data = res.data;
      let locationCode = data.Key;
      let locationName = data.LocalizedName;
      console.log(locationCode);
      console.log(`${locationName}にいます`);
      this.setState({
        locationCode: locationCode
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
          <p>WEATHER INFO</p>
          <p><button onClick={this.getCurrentWeather}>get weather</button></p>
          <p><button onClick={this.getCurrentLocationCode}>get current location code</button></p>
      </div>
    )
  }
}
