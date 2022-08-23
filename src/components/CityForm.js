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
    }
  }

cityInput = (e) => {
  e.preventDefault();
  
  this.setState({city: e.target.value});
}

getCityData = async (e) => {
  e.preventDefault();
  console.log('hello world');
  let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
  let cityData = await axios.get(url);
  console.log(cityData.data[0]);
  console.log(cityData);
  this.setState({cityData: cityData.data[0]});
  this.setState({cityLon: cityData.data[0].lon});
  this.setState({cityLat: cityData.data[0].lat});
  console.log('hello world');
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
    
      <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{this.state.city}</Card.Title>
        <Card.Text>
          Longitude: {this.state.cityLon}
          Latitude: {this.state.cityLat}
        </Card.Text>
      </Card.Body>
    </Card>

      
      </>
    )
  }
}

export default FormCity;