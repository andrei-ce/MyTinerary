import React, { Component } from 'react'
import Banner from '../components/Banner'
import Browse from '../components/Browse'
import Carousel from '../components/Carousel'

export default class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <div className="InnerLanding">
          <Banner />
          <Browse />
        </div>
        <Carousel />
      </div>
    )
  }
}
