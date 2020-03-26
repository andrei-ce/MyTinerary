import React, { Component } from 'react';
import { Menu, MenuItem, Avatar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  purple: {
    color: 'white',
    backgroundColor: '#a1a1a1'
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <Avatar
            className={classes.purple}
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={this.handleClick}>
            <PersonIcon />
          </Avatar>
        </div>
        <Menu
          id='simple-menu'
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}>
          <Link to='/'>
            <MenuItem onClick={this.handleClose}>Login</MenuItem>
          </Link>
          <Link to='/registration'>
            <MenuItem onClick={this.handleClose}>Sign Up</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(AvatarDropDownComponent);

// import React from 'react';
// import { Avatar, Menu, MenuItem } from '@material-ui/core/';
// import { makeStyles } from '@material-ui/core/styles';
// import PersonIcon from '@material-ui/icons/Person';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   gray: {
//     color: 'white',
//     backgroundColor: '#a1a1a1',
//   },
// }));

// export default function AvatarDropDown() {
//   const classes = useStyles();

//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = event => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <div className={classes.root}>
//         <Avatar className={classes.gray} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
//           <PersonIcon />
//         </Avatar>
//       </div>
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>Login</MenuItem>
//         <MenuItem onClick={handleClose}>Sign Up</MenuItem>
//       </Menu>
//     </div>
//   );
// }
