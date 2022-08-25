import React from 'react';
import Movies from './Movies'

class Movie extends React.Component{
  render() {
    let movieArray = this.props.movieData.map((value, i) => (
      <Movies value = {value} key = {i}/>
      ))
    return(
      <>
      {movieArray}
      </>
    )
  }
}
export default Movie;