import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

// NextArrow and PrevArrow components here
const NextArrow = ({ onClick }) => (
  <button className="arrow next" onClick={onClick}></button>
);

const PrevArrow = ({ onClick }) => (
  <button className="arrow prev" onClick={onClick}></button>
);


export default function PodcastCarousel() {
  // State
  const [recommendedPodcasts, setRecommendedPodcasts] = useState([]);
  const [setExpandedDescriptions] = useState({});

  // Fetch podcast information from the API on component mount
  useEffect(() => {
    axios
      .get('https://podcast-api.netlify.app/shows')
      .then((response) => {
        setRecommendedPodcasts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching podcasts:', error);
      });
  }, []);

  // Handle "Read More" click
  const handleReadMoreClick = (podcastId) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [podcastId]: !prevState[podcastId],
    }));
  };

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="carousel-container">
      <h1 className='recomended-podcasts'>Recommended Podcasts</h1>
      <Slider {...sliderSettings}>
        {recommendedPodcasts.map((podcast) => (
          <div key={podcast.id} className="carousel-item">
            <Link to={`/podcast/${podcast.id}`}>
              <img src={podcast.image} alt={podcast.title} />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}