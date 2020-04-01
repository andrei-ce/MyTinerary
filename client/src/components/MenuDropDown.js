import React from 'react';
import { Menu, MenuItem } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  menuItems: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'black',
    width: 180
  },
  menuIcons: {
    paddingRight: 10
  }
}));

export default function AvatarDropDown() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className={classes.root}>
        <MenuIcon aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick} />
      </div>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem className={classes.menuItems} onClick={handleClose}>
          <Link to='/'>
            <HomeIcon className={classes.menuIcons} /> Home
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItems} onClick={handleClose}>
          <Link to='/Cities'>
            <LocationCityIcon className={classes.menuIcons} />
            Cities
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItems} onClick={handleClose}>
          <Link to='/'>
            <FavoriteIcon className={classes.menuIcons} /> Favorites{' '}
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
