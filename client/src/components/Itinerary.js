import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Activity from './Activity';
import '../styles/itinerary.css';
import Comment from './Comment';
import CommentField from './CommentField';
import { connect } from 'react-redux';

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
  handleChange = (itineraryId) => {
    this.props.changeExpanded(itineraryId);
  };

  render() {
    const { classes, expanded, isAuthenticated } = this.props;
    const { _id, title, img, duration, description, price, rating } = this.props.itinerary;
    console.log(this.props);
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
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className='Itinerary-details'>
            {_id === expanded ? (
              <Activity itineraryId={_id} className='Itinerary-activities' />
            ) : null}
            <Typography className='Itinerary-description'>{description}</Typography>
            <h4 className={classes.title}> Comments </h4>
            <hr />
            <Comment></Comment>
            {isAuthenticated ? <CommentField itinerary_id={expanded}></CommentField> : null}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Itinerary));
