import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import PopularItineraries from '../components/PopularItineraries';
import Grid from '@material-ui/core/Grid';

export default class Landing extends Component {
  render() {
    return (
      <Grid container className='Landing'>
        <Grid item className='Jumbotron-wrapper'>
          <Jumbotron />
        </Grid>
        {/* <PopularItineraries /> */}
      </Grid>
    );
  }
}
