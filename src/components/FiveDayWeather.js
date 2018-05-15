import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  getFiveDayWeather,
  addError,
  clearError
} from '../actions/actions';
import { bindActionCreators } from 'redux';
import store from '../store/weatherStore';
import FiveDayWeatherList from './FiveDayWeatherList';

class FiveDayWeather extends React.Component {
  constructor(props) {
    super(props);
    this.weatherAPI = {
      baseURL: 'http://dataservice.accuweather.com',
      apiKey: process.env.WEATHER_API_KEY,
      fiveDayForecastURL: 'forecasts/v1/daily/5day',
    };
    this.getFiveDayWeather = this.getFiveDayWeather.bind(this);
  }
 
  getFiveDayWeather = locationCode => {
    if (locationCode !== 0) {
      axios.get(`${this.weatherAPI.baseURL}/${this.weatherAPI.fiveDayForecastURL}/${locationCode}`, {
        params: {
          apikey: this.weatherAPI.apiKey,
          language: 'ja-jp',
          metric: true
        }
      })
      .then((res) => {
        let data = res.data;
        store.dispatch(getFiveDayWeather(data.DailyForecasts));
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  componentDidMount() {
    const { locationCode } = this.props.state;
    this.getFiveDayWeather(locationCode);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.state.locationCode !== this.props.state.locationCode) {
      this.getFiveDayWeather(nextProps.state.locationCode);
    }
  }

  render() {
    return (
      <div className='weather-panel future'>
        <FiveDayWeatherList />
      </div>
    )
  }
}

const mapStateToProps = state => {return {state: state}};

export default connect(mapStateToProps)(FiveDayWeather);
