 import React from 'react'
 import ReactDOM from 'react-dom'
 import WeatherApp from './components/WeatherApp'
 import 'normalize.css/normalize.css'
 import './styles/styles.scss'

 const app = document.getElementById('app');
 ReactDOM.render(<WeatherApp />, app);
