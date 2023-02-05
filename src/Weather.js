import React from "react";
import { Card } from "react-bootstrap";
import WeatherDay from "./WeatherDay";

class Weather extends React.Component {

  render() {
    return (
      <Card.Text>
        <p>Weather</p>
        <ul>
          {this.props.weatherData.map((item) =>
            <WeatherDay item={item} />
          )}
        </ul>
      </Card.Text>
    )
  }
}


export default Weather;