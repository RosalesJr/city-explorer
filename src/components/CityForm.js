import React from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

class FormCity extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cityData: [],
      city: '',
      cityLon: '',
      cityLat: '',
      mapImg: '',
      weather: {},
      error: false,
      errorMessage: '',
    }
  }

cityInput = (e) => {
  e.preventDefault();
  
  this.setState({city: e.target.value});
}

getCityData = async (e) => {
  e.preventDefault();
  try {
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
    let cityData = await axios.get(url);
    this.setState({cityData: cityData.data[0]});
    this.setState({cityLon: cityData.data[0].lon});
    this.setState({cityLat: cityData.data[0].lat});
  }catch(error){
    console.log(error)
    this.setState({
      error: true,
      errorMessage: `An Error Occured: ${error.message}`
    });
  }
}



  render(){
    return (
      <>
      <Form onSubmit={this.getCityData}>
      <Form.Group>
        <Form.Label>Pick a city to explore!
          <input type='text' onInput={this.cityInput}/>
        </Form.Label>
      </Form.Group>
      <Button type = 'submit'>
        Explore!
      </Button>
    </Form>
    {this.state.error
        ?
        <p>{this.state.errorMessage}</p>
        :
      <Card style={{ width: '18rem' }}>
      <Card.Img src={ `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=13&size=440x400`} alt = 'Picture of map'/>
      <Card.Body>
        <Card.Title>{this.state.city}</Card.Title>
        <Card.Text>
          Longitude: {this.state.cityLon}
          Latitude: {this.state.cityLat}
        </Card.Text>
      </Card.Body>
    </Card>}

      
      </>
    )
  }
}

export default FormCity;