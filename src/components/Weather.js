import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  updateWeatherDescTemp,
  updateLatLong,
  updateLocation,
  setCurrentDate,
  addError,
  clearError
} from '../actions/actions';
import { bindActionCreators } from 'redux';
import store from '../store/weatherStore';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      locationCode: ""
    };
    this.weatherAPI = {
      baseURL: 'http://dataservice.accuweather.com',
      apiKey: 'VLYBIQ48eBl4bYVrrwbsbu1h7GguIaAC',
      currentWeatherURL: 'currentconditions/v1',
      geopositionSearchURL: 'locations/v1/cities/geoposition/search',
      fiveDayForecastURL: 'forecasts/v1/daily/5day',
      autocompleteSearchURL: 'locations/v1/cities/autocomplete'
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getCurrentLocationCode = this.getCurrentLocationCode.bind(this);
    this.setCurrentDate = this.setCurrentDate.bind(this);
  }
  
  success = position => {
    return new Promise((resolve, reject) => {
      let latitude  = position.coords.latitude;
      let longitude = position.coords.longitude;
      this.setState({
        latitude: latitude,
        longitude: longitude
      });
      store.dispatch(updateLatLong({latitude:latitude, longitude:longitude}));
      resolve();
    });
  }

  error = () => {
    store.dispatch(addError("Unable to retrieve your location"))
  }

  getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation){
        this.setState({
          error: "Geolocation is not supported by your browser"
        });
        store.dispatch(addError("Geolocation is not supported by your browser"))
        return;
      }
      navigator.geolocation.getCurrentPosition(this.success, this.error);
      resolve();
    });
  }

  setCurrentDate = epochtime => {
    let date = {};
    date.epoch = new Date(0);
    date.epoch.setUTCSeconds(epochtime);
    date.day = date.epoch.getDate();
    date.month = date.epoch.getMonth() + 1;
    store.dispatch(setCurrentDate({date: date}));
  }

  getCurrentWeather = () => {
    axios.get(`${this.weatherAPI.baseURL}/${this.weatherAPI.currentWeatherURL}/${this.state.locationCode}`, {
      params: {
        apikey: this.weatherAPI.apiKey,
        language: 'ja-jp'
      }
    })
    .then((res) => {
      let data = res.data[0];
      let temperature = data.Temperature.Metric.Value;
      let weatherDesc = data.WeatherText;
      this.setCurrentDate(data.EpochTime);
      store.dispatch(updateWeatherDescTemp({weatherDesc: weatherDesc, temperature: temperature}));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  

  // TODO: implement 5 day weather forecast
  // getFiveDayWeather = () => {
  //   axios.get(`${this.weatherAPI.baseURL}/${this.weatherAPI.fiveDayForecastURL}/${this.state.locationCode}`, {
  //     params: {
  //       apikey: this.weatherAPI.apiKey,
  //       language: 'ja-jp',
  //       metric: true
  //     }
  //   })
  //   .then((res) => {
  //     let data = res.data;
  //     data.DailyForecasts.forEach(forecast => {
  //       store.dispatch(getFiveDayWeather({
  //         date: forecast.Date,
  //         temperatureMin: forecast.Temperature.Minimum.Value,
  //         temperatureMax: forecast.Temperature.Maximum.Value
  //       }));
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }

  // TODO: autocomplete search - only searchable with kanji for ja or english for en - use q for query string
  // getFiveDayWeather = () => {
  //   axios.get(`${this.weatherAPI.baseURL}/${this.weatherAPI.autocompleteSearchURL}`, {
  //     params: {
  //       apikey: this.weatherAPI.apiKey,
  //       language: 'ja-jp',
  //       q: query
  //     }
  //   })
  //   .then((res) => {
      
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }

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
        locationCode: locationCode
      });
      store.dispatch(updateLocation({locationCode:locationCode, locationName:locationName}));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getCurrentLocation();

    // setInterval(() => {
    //   this.getCurrentLocation();
    // }, 5 * 60 * 1000);
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.latitude !== this.state.latitude || prevState.longitude !== this.state.longitude) {
      this.getCurrentLocationCode();
    }
    if (prevState.locationCode !== this.state.locationCode) {
      this.getCurrentWeather();
    }
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    return (
      <div className='weather-container'>
        <div className='weather-panel current'>
            {/* {this.props.state.errors && <p>{this.props.state.errors}</p>} */}
            <p className='weather-desc'>{this.props.state.weatherDesc}</p>
            <p className='temperature'>{this.props.state.temperature}°C</p>
        </div>
        <div className='weather-panel future'>
          <ul className='future-weather-list'>
            <li><strong className='day'>明日</strong><span className='temperature'>17°C</span><i className='weather-icon sunny-cloud'></i></li>
            <li><strong className='day'>明後日</strong><span className='temperature'>19°C</span><i className='weather-icon sunny-cloud'></i></li>
            <li><strong className='day'>土曜日</strong><span className='temperature'>22°C</span><i className='weather-icon sunny'></i></li>
            <li><strong className='day'>日曜日</strong><span className='temperature'>23°C</span><i className='weather-icon sunny'></i></li>
            <li><strong className='day'>月曜日</strong><span className='temperature'>19°C</span><i className='weather-icon rainy'></i></li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {return {state: state}};

// console.log(store.getState())

export default connect(mapStateToProps)(Weather);
