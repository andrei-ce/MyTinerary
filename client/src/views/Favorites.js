import React, { Component } from 'react';
import { connect } from 'react-redux';
import Itinerary from '../components/Itinerary';
import '../styles/itinerary.css';
import Grid from '@material-ui/core/Grid';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: ''
    };
  }

  changeExpanded = (itineraryId) => {
    this.state.expanded === itineraryId
      ? this.setState({ expanded: '' })
      : this.setState({ expanded: itineraryId });
  };

  render() {
    console.log(this.props);
    const favorites = this.props.user === null ? null : this.props.user.favorites;
    return (
      <Grid container className='Favorites'>
        <Grid item>
          <h2 className='Favorites-title'>Your favorites</h2>
          <hr />
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
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  };
};

export default connect(mapStateToProps, {})(Favorites);

// const { _id, title, img, duration, description, price, rating } = this.props.itinerary;

// {itineraries.map((itinerary) => {
//   return (
//     <Itinerary
//       key={itinerary._id}
//       expanded={this.state.expanded}
//       changeExpanded={this.changeExpanded}
//       itinerary={itinerary}
//     />
//   );
