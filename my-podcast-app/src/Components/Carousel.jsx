import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

const NextArrow = ({ onClick }) => (
  <button className="arrow next" onClick={onClick}></button>
);

const PrevArrow = ({ onClick }) => (
  <button className="arrow prev" onClick={onClick}></button>
);

export default function PodcastCarousel() {
  const [recommendedPodcasts, setRecommendedPodcasts] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://podcast-api.netlify.app/shows')
      .then((response) => {
        setRecommendedPodcasts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching podcasts:', error);
        setLoading(false);
      });
  }, []);

  const handleReadMoreClick = (podcastId) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [podcastId]: !prevState[podcastId],
    }));
  };

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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Slider {...sliderSettings}>
          {recommendedPodcasts.map((podcast) => (
            <div key={podcast.id} className="carousel-item">
              <Link to={`/podcast/${podcast.id}`}>
                <img src={podcast.image} alt={podcast.title} />
              </Link>
              {expandedDescriptions[podcast.id] ? (
                <p>{podcast.description}</p>
              ) : (
                <p>{podcast.shortDescription}</p>
              )}
              <button onClick={() => handleReadMoreClick(podcast.id)}>
                Read More
              </button>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
