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

class FiveDayWeather extends React.Component {
  constructor(props) {
    super(props);
    this.weatherAPI = {
      baseURL: 'http://dataservice.accuweather.com',
      apiKey: 'VLYBIQ48eBl4bYVrrwbsbu1h7GguIaAC',
      fiveDayForecastURL: 'forecasts/v1/daily/5day',
    };
    this.getFiveDayWeather = this.getFiveDayWeather.bind(this);
  }
 
  getFiveDayWeather = () => {
    axios.get(`${this.weatherAPI.baseURL}/${this.weatherAPI.fiveDayForecastURL}/2351574`, {
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

  render() {
    return (
      <div className='weather-panel future'>
        <ul className='future-weather-list'>
        this.props.state.fiveDayWeather.forEach((weatherListing, index) = > {
          <li><strong className='day'>index</strong><span className='temperature'>weatherListing</span><i className='weather-icon sunny-cloud'></i></li>
        });
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {return {state: state}};

export default connect(mapStateToProps)(FiveDayWeather);
