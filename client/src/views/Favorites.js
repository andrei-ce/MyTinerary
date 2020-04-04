import React, { Component } from 'react';
import { connect } from 'react-redux';
import Itinerary from '../components/Itinerary';
import '../styles/itinerary.css';

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
      <div className='Favorites'>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  };
};

export default connect(mapStateToProps, {})(Favorites);
