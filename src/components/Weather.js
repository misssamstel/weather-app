import React from 'react';
import axios from 'axios';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      locationCode: 0,
      locationName: "",
      weatherDesc: "",
      temperature: 0
    }
    this.weatherAPI = {
      baseURL: 'http://dataservice.accuweather.com',
      apiKey: 'VLYBIQ48eBl4bYVrrwbsbu1h7GguIaAC',
      currentWeatherURL: 'currentconditions/v1',
      geopositionSearchURL: 'locations/v1/cities/geoposition/search'
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getCurrentLocationCode = this.getCurrentLocationCode.bind(this);
  }
  
  success = position => {
    return new Promise((resolve, reject) => {
      let latitude  = position.coords.latitude;
      let longitude = position.coords.longitude;
      this.setState({
        currentLocation: `Latitude is ${latitude} & Longitude is ${longitude}`,
        latitude: latitude,
        longitude: longitude
      });
      resolve();
    });
  }

  error = () => {
    this.setState({
      error: "Unable to retrieve your location"
    });
  }

  getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
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
      resolve();
    });
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
      this.setState({
        weatherDesc: weatherDesc,
        temperature: temperature
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getCurrentLocationCode = () => {
    axios.get(`${this.weatherAPI.baseURL}/${this.weatherAPI.geopositionSearchURL}`, {
      params: {
        apikey: this.weatherAPI.apiKey,
        q: `${this.state.latitude},${this.state.longitude}`,
        language: 'ja-jp'
      }
    })
    .then((res) => {
      let data = res.data;
      let locationCode = data.Key;
      let locationName = data.LocalizedName;
      this.setState({
        locationCode: locationCode,
        locationName: locationName
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.latitude !== this.state.latitude || prevState.longitude !== this.state.longitude) {
      this.getCurrentLocationCode();
    }
    if (prevState.locationCode !== this.state.locationCode) {
      this.getCurrentWeather();
    }
  }

  render() {
    return (
      <div>
          <p>WEATHER INFO</p>
          {this.state.error && <p>{this.state.error}</p>}
          <p>You are in {this.state.locationName}</p>
          <p>It is {this.state.weatherDesc}</p>
          <p>It is {this.state.temperature}°C</p>
      </div>
    )
  }
}
