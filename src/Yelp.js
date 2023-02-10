import React from "react"
import { Card } from "react-bootstrap"

class Yelp extends React.Component {
  render() {
    return (
        <>
        {this.props.yelpData.map((item, idx) =>
          <Card key={idx}>
            <Card.Title>{item.name}</Card.Title>
            <img src={`${item.image_url}`} alt={`${item.id}`} height={200} width={150} />
            <Card.Text className="description"></Card.Text>
            <Card.Text>Price: {item.price}</Card.Text>
            <Card.Text>Rating: {item.rating}</Card.Text>
            <Card.Text>
              <a href ={item.url}>Visit us at {item.name}</a>
              </Card.Text>
          </Card>
        )}
      </>
    )
  }
}

export default Yelp;

