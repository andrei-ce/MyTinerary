import React, { Component } from 'react';
import City from '../components/City';
import loader from '../img/loader.svg';
//higher order component
import { connect } from 'react-redux';
import { getCities } from '../store/actions/cityActions';

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    }
  }

  handleSearch = (evt) => {
    this.setState({
      searchText: evt.target.value
    });
  }

  componentDidMount() {
    this.props.getCities()
  }

  render() {
    const { cities, isFetching } = this.props.cities;
    return (
      <div className="Cities">
        <div className="Cities-searchBar">
          <input onChange={this.handleSearch} type="text" id="searchBar" placeholder="Search city..." />
          <img src={loader} alt="loading" className={isFetching ? null : "loaded"}></img>
        </div>
        <div className="Cities-cityList">

          {cities
            .filter(city =>
              city.name.toLowerCase().startsWith(this.state.searchText.toLowerCase()))
            .map(city => {
              return <div key={city._id} className="Cities-cityCard">
                <City city={city} />
              </div>
            })
          }
        </div>
      </div>
    )
  }
}

//map some of the data in the state of the Store as a Props in this component
const mapStateToProps = (state) => {
  return {
    cities: state.cities
  }
}

// add mapDispatchToProps function --> or, directly plug in the getCities function as below:

//connect is a higher order component that connects the component to the Store
export default connect(mapStateToProps, { getCities })(Cities);