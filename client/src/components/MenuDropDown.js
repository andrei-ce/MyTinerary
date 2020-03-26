import React from 'react';
import { Menu, MenuItem } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  menuItems: {
    display: 'flex',
    alignItems: 'center',
    justify: 'space-between',
    textDecoration: 'none',
    color: 'black',
  }
}));

export default function AvatarDropDown() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className={classes.root}>
        <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link className={classes.menuItems} to="/"><HomeIcon /> Home</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={classes.menuItems} to="/Cities"><LocationCityIcon /> Cities</Link>
        </MenuItem>
        <MenuItem className={classes.menuItems} onClick={handleClose}>
          <Link className={classes.menuItems} to="/"><FavoriteIcon /> Favorites </Link>
        </MenuItem>
      </Menu>
    </div >
  );
}