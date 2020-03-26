import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter, Link } from 'react-router-dom';
import '../styles/bottomNav.css';


class BottomNav extends Component {

  goBack = () => this.props.history.goBack();

  render() {
    return (
      <BottomNavigation className="BottomNav">
        <div>
          <BottomNavigationAction label="Back" value="back" icon={<ArrowBackIosIcon />} onClick={this.goBack} />
        </div>
        <Link to="/">
          <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        </Link>
        <Link to="/Cities">
          <BottomNavigationAction label="Cities" value="cities" icon={<LocationCityIcon />} />
        </Link>
        <div>
          <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
        </div>
      </BottomNavigation>
    )
  }
}

export default withRouter(BottomNav);