import React from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Weather from "./Weather";
import Movie from "./Movie";
import 'bootstrap/dist/css/bootstrap.min.css';

class FormCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      city: 'Seattle',
      lat: '12',
      lon: '10',
      mapImg: '',
      weatherArr: [],
      movieArr: [],
      error: false,
      errorMessage: '',
      showWeather: false,
      showMovie: false,
    }
  }

  cityInput = (e) => {
    e.preventDefault();

    this.setState({ city: e.target.value });
  }

  getCityData = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      let cityData = await axios.get(url);

      let weatherURL =  `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}&lat=${this.state.lat}&lon=${this.state.lon}`
      let weatherArr = await axios.get(weatherURL);

      let movieURL = `${process.env.REACT_APP_SERVER}/movies?city=${this.state.city}`
      let movieArr = await axios.get(movieURL);

      this.setState({ cityData: cityData.data[0] });
      this.setState({ lat: cityData.data[0].lat });
      this.setState({ lon: cityData.data[0].lon });
      this.setState({ weatherArr: weatherArr.data });
      this.setState({movieArr: movieArr.data})
      this.setState({showWeather: true})
      this.setState({showMovie: true})
    } catch (error) {
      console.log(error)
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.message}`
      });
    }
  }



  render() {
    console.log(this.state)
    return (
      <>

        <Form onSubmit={this.getCityData}>
          <Form.Group>
            <Form.Label>Pick a city to explore!
              <input type='text' onInput={this.cityInput} />
            </Form.Label>
          </Form.Group>
          <Button type='submit'>
            Explore!
          </Button>
        </Form>
        {this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
          <>
            <Card style={{ width: '18rem' }}>
              <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=13&size=440x400`} alt='Picture of map' />
              <Card.Body>
                <Card.Title>{this.state.city}</Card.Title>
                <Card.Text>
                  Latitude: {this.state.lat}
                  Longitude: {this.state.lon}
                </Card.Text>
              </Card.Body>
            </Card>
            {this.state.showWeather &&<Weather weatherData={this.state.weatherArr} />}
            {this.state.showMovie &&<Movie movieData={this.state.movieArr} />}
          </>
        }


      </>
    )
  }
}

export default FormCity;