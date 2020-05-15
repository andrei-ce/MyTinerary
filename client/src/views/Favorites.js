import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Itinerary from '../components/Itinerary';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GIF from '../img/tenor.gif';

import '../styles/itinerary.css';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: '',
    };
  }

  changeExpanded = (itineraryId) => {
    this.state.expanded === itineraryId
      ? this.setState({ expanded: '' })
      : this.setState({ expanded: itineraryId });
  };

  render() {
    window.scrollTo(0, 0);
    const favorites = this.props.user === null ? null : this.props.user.favorites;
    return (
      <div
        className='Favorites'
        style={this.props.user === null ? null : { backgroundColor: `#ebebeb` }}>
        <h2 className='Favorites-title'>Your favorites</h2>
        <hr />
        {this.props.user === null ? (
          <Container>
            <p>You need to be logged in to favorite itineraries</p>
            <img src={GIF} alt='Can´t find favorites' className='gif' />
            <script type='text/javascript' async src='https://tenor.com/embed.js'></script>
            <Grid container className='login-links'>
              <Grid item xs>
                <Link to='login' variant='body2' className='link top-margin'>
                  Login
                </Link>
              </Grid>
              <Grid item>
                <Link to='registration' variant='body2' className='link top-margin'>
                  Create an account
                </Link>
              </Grid>
            </Grid>
          </Container>
        ) : null}
        {favorites
          ? favorites.map((itinerary) => {
              return (
                <Itinerary
                  key={itinerary._id}
                  expanded={this.state.expanded}
                  changeExpanded={this.changeExpanded}
                  itinerary={itinerary}
                />
              );
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

export default connect(mapStateToProps, {})(Favorites);
