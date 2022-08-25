import React from 'react';
import Card from 'react-bootstrap/Card'

class Movie extends React.Component{
  render() {
    let movieArray = this.props.movieData.map((value, i) => (
      
      <Card style={{ width: '18rem' }} key = {i}>
      <Card.Body>
        <Card.Text>
        {value.name}
        </Card.Text>
      </Card.Body>
    </Card>
    ))
    return(
      <>
      {movieArray}
      </>
    )
  }
}
export default Movie;