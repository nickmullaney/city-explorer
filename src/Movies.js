import React from "react"
import { Card } from "react-bootstrap"

class Movies extends React.Component {
  render() {
    return (
        <>
        {this.props.moviesData.map((item, idx) =>
          <Card key={idx}>
            <Card.Title>{item.title}</Card.Title>
            <img src={`https://image.tmdb.org/t/p/w500${item.poster}`} alt={`${item.title}`} height={200} width={150} />
            <Card.Text className="description">{item.overview}</Card.Text>
            <Card.Text>Voter Score: {item.average_votes}</Card.Text>
            <Card.Text>Popularity: {item.popularity}</Card.Text>
            <Card.Text>Release Date: {item.released_on}</Card.Text>
          </Card>
        )}
      </>
    )
  }
}

export default Movies;

