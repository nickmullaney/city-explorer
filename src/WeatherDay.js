import React from "react"
import { Card } from "react-bootstrap";


class WeatherDay extends React.Component {
  render() {
    return (
      <>
      <Card.Text> { this.props.item.date }</Card.Text>
      <Card.Text> {this.props.item.description}</Card.Text>
      </>
    )
  }
}


export default WeatherDay;