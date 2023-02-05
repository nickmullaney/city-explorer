import React from "react";
import { Card } from "react-bootstrap";
import WeatherDay from "./WeatherDay";

class Weather extends React.Component {

  render() {
    console.log(this.props.weatherData);
    return (
      <Card>
        {this.props.weatherData.map((item, idx) =>
          <WeatherDay item={item} key={idx} />
        )
        }
      </Card >
    )
  };
}
export default Weather;