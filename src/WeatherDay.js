import React from "react"
import { Card } from "react-bootstrap";


class WeatherDay extends React.Component {
  render() {
    return (
      <Card>
      <Card.Title>{ this.props.item.date }</Card.Title>
      <Card.Text> {this.props.item.description}</Card.Text>
      </Card>
    )
  }
}


export default WeatherDay;