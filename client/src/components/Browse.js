import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core/';
import Circle from '../img/circle.png'
import { Link } from 'react-router-dom'

const styles = () => ({ // between () theme can me applied
  root: {
    width: '88%',
    maxWidth: 600,
    padding: 16,
    margin: '0 10px',
  },
  innerContent: {
    padding: 0
  },
  title: {
    fontSize: 14,
    padding: 15,
  },
  img: {
    height: 80,
    width: 80,
  }
});

class Browse extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent className={classes.innerContent}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Find your perfect trip, designed by insiders who know and love their cities
          </Typography>
          <Link to="/cities">
            <img className={classes.img} src={Circle} alt="circled arrow" />
          </Link>
          <Typography variant="h5" component="h2">
            Start Browsing...
        </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Browse);