import React from "react";
import { Container } from "react-bootstrap";

class Map extends React.Component{
  render(){
    return(
      <Container className="text-center">
        <img src = {`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.props.lat},${this.props.lon}&zoom=12`} alt ={'Map of ${this.state.cityData.display_name}'}/>
        {console.log(`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.props.lat},${this.props.lon}&zoom=12`)} 
      </Container>
    )
  }
}

export default Map;