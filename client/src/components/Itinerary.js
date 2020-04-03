import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Activity from './Activity';
import Comment from './Comment';
import CommentField from './CommentField';
import { connect } from 'react-redux';
import { getComments } from '../store/actions/commentActions';
import '../styles/itinerary.css';

const styles = (theme) => ({
  root: {
    width: '100%',
    margin: '15px 0',
    paddingLeft: '0'
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    flexBasis: '33.33%',
    flexShrink: 0,
    borderRight: '1px solid grey',
    borderLeft: '1px solid grey',
    height: '100%',
    padding: '15px 5px'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    paddingLeft: 5,
    paddingRight: 5
  },
  title: {
    margin: '30px 0 10px 0'
  }
});

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: false
    };
  }

  handleChange = (itineraryId) => {
    this.props.changeExpanded(itineraryId);
    this.props.getComments(itineraryId);
  };

  //will take an itinerary after! Need to add it to the list of favorites on the front end (id would be sent to mongodb anyways and when user log in again it will load again)
  handleFavorite = (itineraryId) => {
    console.log(itineraryId);
    this.setState({ favorite: !this.state.favorite });
  };

  render() {
    const { classes, expanded, isAuthenticated, comments } = this.props;
    const { _id, title, img, duration, description, price, rating } = this.props.itinerary;
    console.log(this.props.comments);
    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={_id === expanded} onChange={() => this.handleChange(_id)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'>
            <div
              className='Itinerary-img'
              style={{
                backgroundImage: `url(${img})`
              }}></div>
            <Typography className={classes.heading}>{title}</Typography>
            <Typography className={classes.secondaryHeading}>
              {duration} | {price} | Rating: {rating}
            </Typography>
            {this.state.favorite ? (
              <FavoriteIcon onClick={() => this.handleFavorite(_id)} />
            ) : (
              <FavoriteBorderIcon onClick={() => this.handleFavorite(_id)} />
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className='Itinerary-details'>
            {_id === expanded ? (
              <Activity itineraryId={_id} className='Itinerary-activities' />
            ) : null}
            <Typography className='Itinerary-description'>{description}</Typography>
            <h4 className={classes.title}> Comments </h4>
            <hr />
            {_id === expanded
              ? comments.map((comment) => {
                  return <Comment key={comment._id} comment={comment} />;
                })
              : null}
            {isAuthenticated && _id === expanded ? (
              <CommentField itinerary_id={expanded}></CommentField>
            ) : null}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    isFetching: state.comments.isFetching,
    comments: state.comments.comments
  };
};

export default connect(mapStateToProps, { getComments })(withStyles(styles)(Itinerary));
