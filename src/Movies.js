import React from "react"
import { Card } from "react-bootstrap"

class Movies extends React.Component {
  render() {
    return (
      <Card.Text>
        <ul>
          {this.props.moviesData.map((item) =>
            <li>
              <p>{item.title}</p>
              <p>{item.overview}</p>
              <p>{item.average_votes}</p>
              <img src={`https://image.tmdb.org/t/p/w500${item.poster}`} alt={`${item.title}`}></img>
              <p>{item.poster}</p>
              <p>{item.popularity}</p>
              <p>{item.released_on}</p>
            </li>
          )}
        </ul>
      </Card.Text>
    )
  }
}

export default Movies;

