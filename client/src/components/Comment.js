import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';
import '../styles/comments.css';

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  divider: {
    marginRight: 10
  }
});

class Comment extends Component {
  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <Divider className={classes.divider} orientation='vertical' flexItem />
          <ListItemText
            primary='Username, 4 days ago'
            secondary='I am so happy that I found this itinerary.... specially because of the first activity, make sure you have time for it!'
          />
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(Comment);
