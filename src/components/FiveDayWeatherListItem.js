import React from 'react';
// import { determineWeatherIcon } from ;
// import { extractDay } from '../services/datetime';

export default class FiveDayWeatherListItem extends React.Component {
  constructor(props) {
    super(props);

    this.extractDay = this.extractDay.bind(this);
    this.determineDayText = this.determineDayText.bind(this);
    this.determineIconClass = this.determineIconClass.bind(this);
  }

  extractDay = date => {
    const fullDate = new Date(this.props.item.Date);
    const extractedDay = (fullDate.getDay()) + 1;
    return this.determineDayText(extractedDay);
  }

  determineDayText = dayNumber => {
    switch(dayNumber) {
      case 1:
        return '日曜日';
      case 2:
        return '月曜日';
      case 3:
        return '火曜日';
      case 4:
        return '水曜日';
      case 5:
        return '木曜日';
      case 6:
        return '金曜日';
      case 7:
        return '土曜日';
    }
  }

  determineIconClass = iconCode => {
    switch(iconCode) {
      case 12:
      case 13:
      case 14:
      case 18:
      case 31:
        return 'day-rainy';
      case 7:
      case 8:
      case 30:
        return 'day-cloudy';
      case 1:
      case 2:
        return 'day-sunny';
      case 3:
      case 4:
      case 5:
      case 6:
        return 'day-sunny-cloud';
      case 11:
        return 'day-misty';
      case 15:
      case 16:
      case 17:
        return 'day-thunder';
      case 39:
      case 40:
        return 'night-rainy';
      case 38:
        return 'night-cloudy';
      case 33:
      case 34:
        return 'night-sunny';
      case 35:
      case 36:
        return 'night-sunny-cloud';
      case 43:
      case 44:
        return 'night-snowy';
      case 37:
        return 'night-misty';
      case 41:
      case 42:
        return 'night-thunder';
      case 32:
        return 'windy';
      default:
        return 'day-snowy';
    }
  }

  render() {
    return (
      <li>
        <strong className='day'>{ this.extractDay(this.props.item.Date) }</strong>
        <span className='temperature'>Max: { this.props.item.Temperature.Maximum.Value }°C</span>
        <i className={`weather-icon ${ this.determineIconClass(this.props.item.Day.Icon) }`}></i>
        <span className='temperature'>Min: { this.props.item.Temperature.Minimum.Value }°C</span>
      </li>
    )
  }
}
