import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

export class MovieDetails extends Component {
    state = {
        open: false,
    };

    render() {
        const { movie, classes, baseURL } = this.props;
        const defaultImage = 'https://cdn.vox-cdn.com/thumbor/2EzO0m6fiLxRulmJCmBGg5rbadA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13599930/captainmarvelbrielarson.jpg';
        const imageURL = movie.backdrop_path? baseURL + 'w500' + movie.backdrop_path : defaultImage;
        const { open } = this.state;
        return (
            <div className={classes.holder}>
                <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    className={classes.media}
                    height="200"
                    image={imageURL}
                    title={movie.title}
                    />
                    <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                        {movie.title}
                    </Typography>
                    <Typography component="p" className={classes.p}>
                        {movie.genres && movie.genres.map(genre => (
                            <p className={classes.genre}>{genre.name}</p>
                        ))}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Watch
                    </Button>
                    <Button 
                     size="small" 
                     color="primary" 
                     aria-owns={open ? 'simple-popper' : undefined}
                     aria-haspopup="true"
                     onClick={this.handleOpen}
                    >
                        Learn More
                    </Button>
                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll={this.state.scroll}
                    aria-labelledby="scroll-dialog-title"
                    >
                    <div className={classes.dialogTitle}>
                        <DialogTitle id="scroll-dialog-title">
                            {movie.title}
                        </DialogTitle>
                        <a className={classes.x} onClick={this.handleClose}>x</a>
                    </div>
                    <DialogContent>
                        {movie.overview}
                    </DialogContent>
                    </Dialog>
                </CardActions>
                </Card>
            </div>
        )
    }

    handleOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

}

const styles = theme => ({
    holder: {
        padding: 20
    },
    card: {
        maxWidth: 250,
    },
    media: {
        objectFit: 'cover',
    },
    cardContent: {
        height: 80
    },
    p: {
        display: 'flex',
        marginTop: -20,
        color: 'grey'
    },
    genre: {
        marginRight: 10
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    x: {
        padding: 15,
        cursor: 'pointer',
        color: 'grey'
    }
})

export default withStyles(styles)(MovieDetails)
