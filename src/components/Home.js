import React, { Component } from 'react'
import { api_key } from '../config'
import MoviesList from './MoviesList'
import Footer from './Footer'

export class Home extends Component {
  state = {
    movies: null,
    baseURL: null
  }

  componentWillMount= () => {
    this.getMoviesList();
  }

  render() {
    const {movies, baseURL} = this.state
    return (
      <div>
        <MoviesList movies={movies} baseURL={baseURL}/>
        <Footer />
      </div>
    )
  }

  getMoviesList = () => {
    //Get configuration
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${api_key}`)
    .then(resp => resp.json())
    .then(conf => {
        var baseURL = conf.images.base_url;
        this.setState({baseURL: baseURL})
    })

    //Get movies list
    fetch(`https://api.themoviedb.org/3/movie/changes?api_key=${api_key}&page=1`)
    .then(response => response.json())
    .then(data => {
        if(data){ 
            var moviesList = [];
            var results = data.results.slice(0,100); //Get 100 mmovie IDs
            results.forEach(r => {
                var id = r.id;
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
                .then(resp => resp.json())
                .then(movie => {
                    moviesList.push(movie);
                })
            })
            setTimeout(
                () => {
                  this.setState({movies: moviesList})
                }, 1000
            );
        }
    })
    .catch(err => console.log(err));
  }
}

export default Home
