import React, { Component } from 'react'
import Navbar from './Navbar'
import MovieDetails from './MovieDetails' 
import Pagination from './Pagination'
import { withStyles } from '@material-ui/core/styles'

export class MoviesList extends Component {

    state = {
        pageOfItems: [],
        initialList: []
    };

    componentDidMount = () => {
        setTimeout(
            () => {
                var pageOfItems = this.state.pageOfItems;
                this.setState({initialList: pageOfItems});
            },3000
        );
    }

    render() {
        const { classes, movies, baseURL } = this.props;

        return (
        <div className={classes.container}>
            <Navbar handleChange={(e) => this.handleChange(e)}/>
            <div className={classes.moviesList}>
                {movies && this.state.pageOfItems.map(movie => (
                    <MovieDetails key={movie.id} movie={movie} baseURL={baseURL}/>
                ))}
            </div>
            <Pagination items={movies} onChangePage={this.onChangePage} />
        </div>
        )
    }

    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    handleChange(e) {
        let currentList = [];
        let newList = [];

        if (e.target.value !== "") {
            currentList = this.props.movies;
            newList = currentList.filter(item => {
                const lc = item.title.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } 
        else {
            newList = this.state.initialList;
        }
        this.setState({
            pageOfItems: newList
        });
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    moviesList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 20
    }
}) 

export default withStyles(styles)(MoviesList)
