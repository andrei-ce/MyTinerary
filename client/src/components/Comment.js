import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import '../styles/comments.css';

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  divider: {
    marginRight: 10,
  },
});

class Comment extends Component {
  render() {
    const { classes, comment } = this.props;

    return (
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={comment.user.username} src={comment.user.avatar}>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <Divider className={classes.divider} orientation='vertical' flexItem />
          <ListItemText
            primary={`${comment.user.username}, ${moment(comment.date).fromNow()}`}
            secondary={comment.text}
          />
        </ListItem>
      </List>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments,
    user: state.users.user,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Comment));
