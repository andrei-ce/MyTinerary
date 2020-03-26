import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core/';
import MenuDropDown from './MenuDropDown'
import AvatarMenu from './AvatarMenu';


const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menu: {
    backgroundColor: '#282c3e',
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginLeft: 'auto',
  }
});

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.menu} position="fixed">
          <Toolbar>
            <AvatarMenu edge="start" />
            <Typography variant="h4" className={classes.title}>
              MyTinerary
            </Typography>
            <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuDropDown />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header)