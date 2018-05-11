 import React from 'react'
 import ReactDOM from 'react-dom'
 import { Provider } from 'react-redux'
 import 'normalize.css/normalize.css'
 import './styles/styles.scss'
 import store from './store/weatherStore'
 import WeatherApp from './components/WeatherApp'

 const app = document.getElementById('app');
 ReactDOM.render(
  <Provider store={store}>
    <WeatherApp />
  </Provider>,
  app
);
