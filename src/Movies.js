import React from "react"
import { Card } from "react-bootstrap"

class Movies extends React.Component {
  render() {
    return (
        <>
        {this.props.moviesData.map((item, idx) =>
          <Card key={idx}>
            <img src={`https://image.tmdb.org/t/p/w500${item.poster}`} alt={`${item.title}`} />
            <Card.Text>{item.title}</Card.Text>
            <Card.Text>{item.overview}</Card.Text>
            <Card.Text>{item.average_votes}</Card.Text>
            <Card.Text>{item.popularity}</Card.Text>
            <Card.Text>{item.released_on}</Card.Text>
          </Card>
        )}
      </>
    )
  }
}

export default Movies;

