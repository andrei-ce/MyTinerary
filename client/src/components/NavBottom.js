import React, { Component } from 'react';
import { connect } from 'react-redux';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter, Link } from 'react-router-dom';
import '../styles/bottomNav.css';

class NavBottom extends Component {
  goBack = () => this.props.history.goBack();

  render() {
    let { pathname } = this.props.location;
    return (
      <BottomNavigation className='BottomNav'>
        {pathname !== '/' ? (
          <div>
            <BottomNavigationAction
              label='Back'
              value='back'
              icon={<ArrowBackIosIcon />}
              onClick={this.goBack}
            />
          </div>
        ) : null}
        <Link to='/'>
          <BottomNavigationAction label='Home' value='home' icon={<HomeIcon />} />
        </Link>
        <Link to='/cities'>
          <BottomNavigationAction label='Cities' value='cities' icon={<LocationCityIcon />} />
        </Link>
        <Link to='/favorites'>
          <BottomNavigationAction label='Favorites' value='favorites' icon={<FavoriteIcon />} />
        </Link>
      </BottomNavigation>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
  };
};

export default connect(mapStateToProps)(withRouter(NavBottom));
