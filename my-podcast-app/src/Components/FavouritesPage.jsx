import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FavouritesPage.css';

export default function FavouritesPage({ favouritePodcasts }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortedPodcasts, setSortedPodcasts] = useState(favouritePodcasts);
  const [sortOption, setSortOption] = useState('a-z');

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSort = (option) => {
    setSortOption(option);
    switch (option) {
      case 'a-z':
        setSortedPodcasts([...favouritePodcasts].sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'z-a':
        setSortedPodcasts([...favouritePodcasts].sort((a, b) => b.title.localeCompare(a.title)));
        break;
      case 'date-asc':
        setSortedPodcasts([...favouritePodcasts].sort((a, b) => new Date(a.updated) - new Date(b.updated)));
        break;
      case 'date-desc':
        setSortedPodcasts([...favouritePodcasts].sort((a, b) => new Date(b.updated) - new Date(a.updated)));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1 className='favourite-page-heading'>Favourites Page</h1>
      <div className="container">
        {sortedPodcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-item">
            <img src={podcast.image} alt={podcast.title} />
            <h3 className='favourite-page-podcast-title'>{podcast.title}</h3>
            {isExpanded ? (
              <>
                <p className='favourite-page-podcast-description'>{podcast.description}</p>
                <div className="podcast-details">
                  <p>Genre: {getGenreTitle(parseInt(podcast.genre))}</p>
                  <p>Seasons: {podcast.seasons}</p>
                  <p>Updated: {new Date(podcast.updated).toLocaleDateString('en-GB')}</p>
                </div>
                {podcast.episodes &&
                  podcast.episodes.map((episode) => (
                    <div key={episode.id} className="episode-item">
                      <h5>{episode.title}</h5>
                      <p>{episode.description}</p>
                    </div>
                  ))}
                <button className='favourite-page-show-less-button' onClick={toggleExpansion}>Show Less</button>
              </>
            ) : (
              <>
                <Link className='favourite-page-see-podcast-link' to={`/podcast/${podcast.id}`}>See Podcast Details</Link>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

