import React from 'react';

export default class FiveDayWeatherListItem extends React.Component {
  constructor(props) {
    super(props);
    // this.deconstructDate = this.deconstructDate.bind(this);
  }

  // TODO: Extract short date
  // deconstructDate = date => {

  // }

  // componentWillReceiveProps(nextProps, nextState) {
    
  //   }
  // }

  render() {
    return (
      <li>
        <strong className='day'>{ this.props.item.Date }</strong>
        <span className='temperature'>Max: { this.props.item.Temperature.Maximum.Value }°C</span>
        <i className='weather-icon sunny-cloud'></i>
        <span className='temperature'>Min: { this.props.item.Temperature.Minimum.Value }°C</span>
      </li>
    )}
}