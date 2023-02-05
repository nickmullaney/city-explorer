import React from "react";
import { Card } from "react-bootstrap";

class WeatherDay extends React.Component {
  render() {
    return (
      <li>
        {/* Using info from weather API */}
        <p>{this.props.item.date}</p>
        <p>{this.props.item.description}</p>
      </li>
    )
  }
}

export default WeatherDay;
