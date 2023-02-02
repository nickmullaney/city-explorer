import axios from "axios";
import React from "react";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import Map from "./Map";
import img from './img/cityError.jpg';
import img2 from './img/duck-waddling.gif';


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
      weatherData: [],
      showModal: false,
      showErrorMessage: '',
      errorImage: ''
    }
  }

  // Takes care of our search input data, sets the city as the one selected
  handleSearchInput = e => {
    let cityName = e.target.value;
    this.setState({
      city: cityName
    },
      () => console.log(this.state.city)
    )
  }

  //This should display the city data
  displaySearch = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`;

      //this waits the pull response from the url then sets response
      let response = await axios.get(url);
      console.log(response);
      // Gets the weather
      this.getWeather();

      // Gets the movies
      this.getMovies();

      // new state set
      this.setState({
        displayInfo: true,
        cityData: response.data[0]
      })
    }

    //This is error code
    catch (err) {
      this.setState({
        // if statement for diff images
        showModal: true,
        errorImage: img,
        showErrorMessage: 'City Not Found'
      })
    }
  }

  getWeather = async () => {
    try {
      //trying to update with live weather
      // let liveWeather = `https://api.weatherbit.io/v2.0/current?key${REACT_APP_WEATHER_API_KEY}&city=${this.state.city}`;
      //old
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weatherData?searchQuery=${this.state.city}`;
      let response = await axios.get(weatherUrl);
      this.setState({
        weatherData: response.data
      })
    }
    catch (err) {
      this.setState({
        showModal: true,
        errorImage: img2,
        showErrorMessage: 'Error 401: Weather not Found',
        weatherData: []
      });
      console.log(err);
    }
  }

  getMovies = async () => {
    try {
      //trying to update with live weather
      // let liveWeather = `https://api.weatherbit.io/v2.0/current?key${REACT_APP_WEATHER_API_KEY}&city=${this.state.city}`;
      //old
      let moviesUrl = `${process.env.REACT_APP_SERVER}/weatherData?searchQuery=${this.state.city}`;
      let response = await axios.get(moviesUrl);
      this.setState({
        moviesData: response.data
      })
    }
    catch (err) {
      this.setState({
        showModal: true,
        errorImage: img2,
        showErrorMessage: 'Error 401: Weather not Found',
        moviesData: []
      });
      console.log(err);
    }
  }

  // Function to close modal
  closeModal = () => {
    this.setState({
      showModal: false
    })
  }

  // API Error
  handleShowError = (err) => {
    // Set states
  }

  render() {
    return (
      <>
        <Container>
          <Form className="citySearch">
            <Form.Group>
              <Form.Label>Enter a City To Explore</Form.Label>
              <Form.Control type="text" onInput={this.handleSearchInput} placeholder="Search for a city" />
            </Form.Group>
            <Button onClick={this.displaySearch}>Check it out!</Button>
          </Form>
        </Container>

        <div className="cityMap">
          <Card style={{ width: 'auto' }}>
            {/* imports the map */}
            {this.state.cityData.lat &&
              <Map lat={this.state.cityData.lat} lon={this.state.cityData.lon} cityData={this.state.cityData} />}
            <div>
              {this.state.displayInfo &&
                <>
                  <Card.Title as="h2">{this.state.cityData.display_name}</Card.Title>
                  <div className="weather">
                    <Card.Text>Lat: {this.state.cityData.lat}  Lon: {this.state.cityData.lon}</Card.Text>
                    {/* Weather Data */}
                    {this.state.weatherData &&
                      <Card.Text>
                        <p>Weather</p>
                        <ul>
                          {this.state.weatherData.map((item) =>
                            <li>
                              <p>{item.valid_date}</p>
                              <p>{item.description}</p>
                            </li>
                          )}
                        </ul>
                      </Card.Text>}
                  </div>
                </>
              }
            </div>

          </Card>
          <Modal
            show={this.state.showModal}
            onHide={this.closeModal}>
            <Modal.Body>
              <img src={this.state.errorImage}
                alt="City missing"
                height={200}
                width={465} />
              <p>{this.state.showErrorMessage}</p>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

export default Main;