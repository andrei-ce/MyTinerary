import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class PopularItineraries extends Component {
  render() {
    const sliderSettings = {
      className: 'center',
      centerMode: false,
      infinite: false,
      centerPadding: '60px',
      slidesToShow: 1,
      speed: 500,
      rows: 2,
      slidesPerRow: 1,
    };
    return (
      <div>
        <p>Populer Itineraries</p>
        <Slider {...sliderSettings}>
          <div>
            <img src='https://source.unsplash.com/N6HTCyN50p0' alt='barcelona' />
          </div>
          <div className='Carousel-item'>
            <img src='https://source.unsplash.com/TScGhJM716g' alt='berlin' />
          </div>
          <div className='Carousel-item'>
            <img src='https://source.unsplash.com/ABCHenqNe6c' alt='amsterdam' />
          </div>
          <div className='Carousel-item'>
            <img src='https://source.unsplash.com/7F65HDP0-E0' alt='rio de janeiro' />
          </div>
          <div className='Carousel-item'>
            <img src='https://source.unsplash.com/VW8MUbHyxCU' alt='new york' />
          </div>
          <div className='Carousel-item'>
            <img src='https://source.unsplash.com/layMbSJ3YOE' alt='tokyo' />
          </div>
          <div className='Carousel-item'>
            <img src='https://source.unsplash.com/qaNcz43MeY8' alt='sydney' />
          </div>
          <div className='Carousel-item'>
            <img src='https://source.unsplash.com/hzR9rDXWbqo' alt='cape town' />
          </div>
        </Slider>
      </div>
    );
  }
}
