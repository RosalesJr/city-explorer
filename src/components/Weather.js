import React from 'react';
import WeatherDay from './WeatherDay';

class Weather extends React.Component{
  render() {
    let weatherArray = this.props.weatherData.map((value, i) => (
      <WeatherDay value = {value} key = {i}/> 
    ))
    return(
      <>
      {weatherArray}
      </>
    )
  }
}
export default Weather;