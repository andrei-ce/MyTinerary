import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { postComment } from '../store/actions/commentActions';
import '../styles/comments.css';

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  divider: {
    marginRight: 10,
  },
  button: {
    margin: theme.spacing(1),
  },
});

class CommentField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      user: '',
      itinerary_id: '',
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    await this.setState({
      itinerary_id: this.props.itinerary_id,
      user: this.props.user._id,
    });
    let { itinerary_id, user, text } = this.state;
    await this.props.postComment(itinerary_id, user, text);
    this.setState({ text: '' });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={user.username} src={user.avatar} />
          </ListItemAvatar>
          <Divider className={classes.divider} orientation='vertical' flexItem />
          <ListItemText
            primary={user.username}
            secondary={
              <React.Fragment>
                <TextField
                  id='standard-multiline-flexible'
                  label='Comment...'
                  fullWidth
                  multiline
                  rowsMax='4'
                  name='text'
                  value={this.state.text}
                  onChange={this.handleChange}
                />
              </React.Fragment>
            }
          />
          <IconButton aria-label='send' className={classes.button} onClick={this.handleSubmit}>
            <SendIcon />
          </IconButton>
        </ListItem>
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

export default connect(mapStateToProps, { postComment })(withStyles(styles)(CommentField));
