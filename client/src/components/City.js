import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, Card, CardMedia, CardContent, CardActions, CardActionArea, Typography
} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import '../styles/city.css';

const styles = () => ({
  root: {
    maxWidth: 345,
  },
});

class City extends Component {
  render() {
    const { classes, city } = this.props;
    return (
      <Card className={classes.root}>
        <Link to={"/itineraries/bycity/" + city._id}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="City Image"
              height="140"
              image={city.img}
              title={city.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {city.name} - {city.country}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {city.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button size="small" color="primary">
            Share
        </Button>
          <Button size="small" color="primary">
            Learn More
        </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(City);