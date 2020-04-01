import React, { Component } from 'react';
import { Menu, MenuItem } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUser, logoutUser } from '../store/actions/userActions';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
const styles = (theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  avatar: {
    color: 'white',
    height: 45,
    width: 45,
    border: '1px solid grey',
    borderRadius: '50%',
    backgroundColor: 'grey',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  usernameTag: {
    paddingBottom: 0,
    fontSize: 16
  },
  menuItem: {
    width: 200
  },
  menuIcon: {
    paddingRight: 10
  }
});

class AvatarDropDownComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.props.logoutUser();
    this.setState({ anchorEl: null });
  };

  render() {
    let { classes, isAuthenticated } = this.props;
    let userData = isAuthenticated ? this.props.user : { avatar: 'none', username: 'guest' };
    console.log(this.props);
    return (
      <div>
        <div className={classes.root}>
          <div
            className={classes.avatar}
            style={{ backgroundColor: 'none', backgroundImage: `url(${userData.avatar})` }}
            onClick={this.handleClick}
            aria-haspopup='true'
            aria-controls='simple-menu'>
            {isAuthenticated ? null : <PersonIcon />}
          </div>
        </div>
        <Menu
          id='simple-menu'
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}>
          <MenuItem className={(classes.usernameTag, classes.menuItem)}>
            <PersonIcon fontSize={'large'} className={classes.menuIcon} />
            <Typography variant='h6' display='block'>
              {userData.username}
            </Typography>
          </MenuItem>
          <hr />
          {isAuthenticated ? (
            <Link to='/'>
              <MenuItem onClick={this.handleLogout}>
                <ExitToAppIcon className={classes.menuIcon} /> Logout
              </MenuItem>
            </Link>
          ) : (
            <div>
              <Link to='/login'>
                <MenuItem onClick={this.handleClose}>
                  <VpnKeyIcon className={classes.menuIcon} />
                  Login
                </MenuItem>
              </Link>
              <Link to='/registration'>
                <MenuItem onClick={this.handleClose}>
                  <PersonAddIcon className={classes.menuIcon} />
                  Sign Up
                </MenuItem>
              </Link>
            </div>
          )}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    isAuthenticated: state.users.isAuthenticated
  };
};

export default connect(mapStateToProps, { authUser, logoutUser })(
  withStyles(styles)(AvatarDropDownComponent)
);
