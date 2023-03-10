import axios from "axios";
import React from "react";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import Map from "./Map";
import img from './img/cityError.jpg';
import img2 from './img/duck-waddling.gif';
import Weather from './Weather';
import Movies from './Movies';
import Yelp from './Yelp'

export class Main extends React.Component {
  // import props
  constructor(props) {
    super(props);

    //setting state
    this.state = {
      displayInfo: false,
      city: '',
      cityData: {},
      moviesData: [],
      locationData: [],
      weatherData: [],
      yelpData: [],
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
      // console.log(response);
      // Gets the weather
      this.getWeather();

      // Gets the movies
      this.getMovies();

      // gets yelp info
      this.getYelp();

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
      //sets our weather url from our server and searchquery is the same as city for the url on the back end
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`;
      //await our response of the data from the live api
      let response = await axios.get(weatherUrl);
      console.log(response);
      //set state with data and use the defined terms("date" and "description")
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
      let moviesUrl = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`;
      console.log("movie url", moviesUrl);
      let response = await axios.get(moviesUrl);

      this.setState({
        moviesData: response.data
      })
    }
    catch (err) {
      this.setState({
        showModal: true,
        errorImage: img2,
        showErrorMessage: 'Error 401: Movie not Found',
        moviesData: []
      });
      console.log(err);
    }
  }



// Yelp API Stuff
  getYelp = async () => {
    try {
      let yelpUrl = `${process.env.REACT_APP_SERVER}/yelp?searchQuery=${this.state.city}`;
      console.log("Yelp API", yelpUrl);
      let response = await axios.get(yelpUrl);

      this.setState({
        yelpData: response.data
      })
    }
    catch (err) {
      this.setState({
        showModal: true,
        errorImage: img2,
        showErrorMessage: 'Error 401: Yelp not Found',
        yelpData: []
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
    // console.log(this.state);
    return (
      <>
        <Container>
          <Form className="citySearch" onSubmit={this.displaySearch}>
            <Form.Group>
              <Form.Label>Enter a City To Explore</Form.Label>
              <Form.Control type="text" onInput={this.handleSearchInput} placeholder="Search for a city" />
            </Form.Group>
            <Button type="submit">Check it out!</Button>
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
                  <Card.Text>Lat: {this.state.cityData.lat}  Lon: {this.state.cityData.lon}</Card.Text>
                  <div className="cityData">
                    <div className="weather">
                      {/* Weather Data */}
                      {this.state.weatherData.length> 0 &&
                      // Componetized Weather Data
                      <Weather weatherData={this.state.weatherData}/>
                      }
                    </div>
                    <div className="movies">
                      {this.state.moviesData.length > 0 &&
                        <Movies moviesData = {this.state.moviesData}/>
                      }
                    </div>
                    <div className="yelp">
                      {this.state.yelpData.length > 0 &&
                      <Yelp yelpData = {this.state.yelpData}/>}
                    </div>
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
                height={'fit'}
                width={465} />
              {/* height={200}
                width={465} */}
              <p>{this.state.showErrorMessage}</p>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

export default Main;