import React from 'react'
import Card from 'react-bootstrap/Card'

class Movies extends React.Component{
  render(){
    return(
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Text>
        {this.props.value.name}
        </Card.Text>
      </Card.Body>
    </Card>
    )
  }
}

export default Movies;