import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import WorkIcon from '@material-ui/icons/Work';
import FlightIcon from '@material-ui/icons/Flight';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import Button from '@material-ui/core/Button';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

const styles = (theme) => ({
  // between () theme can me applied
  root: {
    width: '88%',
    maxWidth: 600,
    padding: 16
  },
  innerContent: {
    padding: 0
  },
  button: {
    margin: theme.spacing(1)
  },
  title: {
    fontSize: 34,
    padding: 10,
    lineHeight: 1
  },
  description: {
    fontSize: 16,
    display: 'block',
    padding: '20px 0'
  },
  img: {
    height: 80,
    width: 80
  }
});

class Jumbotron extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <Typography className={classes.title} color='primary' gutterBottom>
          Welcome to your next destination!
        </Typography>
        <hr></hr>
        <div className='icon-strip'>
          <WorkIcon />
          <FlightIcon />
          <BeachAccessIcon />
          <AccountBalanceIcon />
          <CameraAltIcon />
          <AudiotrackIcon />
        </div>
        <hr></hr>
        <CardContent className={classes.innerContent}>
          <Typography className={classes.description} color='textSecondary'>
            Find the perfect trip for you, designed by insiders and locals who know and love their
            cities. Curated by our team and 80,000+ travellers just like yourself.
          </Typography>
          <Link to='/cities'>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              endIcon={<FlightTakeoffIcon>send</FlightTakeoffIcon>}>
              Browse
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Jumbotron);
