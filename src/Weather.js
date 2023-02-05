import React from "react";
import { Card } from "react-bootstrap";
import WeatherDay from "./WeatherDay";

class Weather extends React.Component {

  render() {
    return (
      <>
      <h3>Weather Forecast</h3>
        {this.props.weatherData.map((item, idx) =>
          <WeatherDay item={item} key={idx} />
        )
        }
      </ >
    )
  };
}
export default Weather;