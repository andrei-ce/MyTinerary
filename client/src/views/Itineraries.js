import React, { Component } from 'react';
import Itinerary from '../components/Itinerary';
import loader from '../img/loader.svg';
import { connect } from 'react-redux';
import { getItineraries } from '../store/actions/itineraryActions';

class Itineraries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: ""
    }
  }

  changeExpanded = (itineraryId) => {
    this.state.expanded === itineraryId ?
      this.setState({ expanded: "" }) :
      this.setState({ expanded: itineraryId })
  }

  componentDidMount() {
    let id = this.props.match.params.city_id;
    this.props.getItineraries(id);
  }

  render() {
    const { itineraries, isFetching } = this.props.itineraries;
    const city_data = itineraries.length > 0 ? itineraries[0].city_data : null;
    return (
      <div className="Itineraries">
        <h2 className="Itineraries-CityName">
          {city_data === null ?
            <img src={loader} alt="loading" className={isFetching ? null : "loaded"}></img> :
            city_data.name}
          <hr></hr>
        </h2>
        <div className="Itineraries-CityImg" style={city_data === null ? null :
          { backgroundImage: `url(${city_data.img})` }}>
        </div>
        <div className="Itineraries-itineraryList">
          {itineraries.map(it => {
            return <Itinerary
              key={it._id}
              expanded={this.state.expanded}
              changeExpanded={this.changeExpanded}
              itinerary={it} />
          })}
        </div >
      </div >
    )
  }
}

//map some of the data in the state of the Store as a Props in this component
const mapStateToProps = (state) => {
  return {
    itineraries: state.itineraries
  }
}

export default connect(mapStateToProps, { getItineraries })(Itineraries);


