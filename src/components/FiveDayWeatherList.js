import React from 'react';
import { connect } from 'react-redux';
import FiveDayWeatherListItem from './FiveDayWeatherListItem';
import store from '../store/weatherStore';

class FiveDayWeatherList extends React.Component {
  render() {
    return (
      <ul className="future-weather-list">
        { this.props.state.fiveDayWeather.map((item, key) => { return <FiveDayWeatherListItem key={key} item={item}/> }) }
      </ul>
    )}
}

const mapStateToProps = state => {return {state: state}};

export default connect(mapStateToProps)(FiveDayWeatherList);
