import axios from "axios";
import { async } from "q";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";

export class Main extends React.Component {
  // import props
  constructor(props) {
    super(props);

    //setting state
    this.state = {
      displayInfo: false,
      city: '',
      cityData: {},
      restaurantData: [],
      locationData: [],
      weatherData: []

    }
  }

  // Takes care of our search input data, sets the city as the one selected
  handleSearchInput = e =>{
    let cityName = e.target.value;
    this.setState({
      city: cityName
    },
    () => console.log(this.state.city)
    )
  }

  //This should display the city data
  displaySearch = async(e) => {
    e.preventDefault();

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`

    //this waits the pull response from the url then sets response
    let response = await axios.get(url);

    // new state set
   this.setState({
      displayInfo: true,
      cityData: response.data[0]
    })
  }

  render() {
    return (
      <>
        <Container>
          <Form>
            <Form.Group>
              <Form.Label>Enter a City To Explore</Form.Label>
              <Form.Control type="text" onInput={this.handleSearchInput}/>
            </Form.Group>
            <Button onClick={this.displaySearch}>Check it out!</Button>
          </Form>
        </Container>

        {this.state.displayInfo &&
          <>
            <h2>{this.state.cityData.display_name}</h2>
            <p>Lat: {this.state.cityData.lat}  Lon: {this.state.cityData.lon}</p>
          </>
        }
      </>
    );
  }
}

export default Main;