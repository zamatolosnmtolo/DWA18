import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FavouritesPage.css';

// Assuming you have a genre mapping similar to the one in HomePage
const genreMapping = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

const FavouritesPage = ({ favouritePodcasts }) => {
  // State to manage expansion of podcast details
  const [isExpanded, setIsExpanded] = useState(false);
  // State to manage sorted podcasts based on the selected option
  const [sortedPodcasts, setSortedPodcasts] = useState(favouritePodcasts);
  // State to manage the selected sorting option
  const [sortOption, setSortOption] = useState('a-z');

  // Toggle expansion of podcast details
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle sorting based on the selected option
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

  // Function to get the genre title based on the genre id
  const getGenreTitle = (genreId) => {
    // Map genreId to genre title using the genreMapping
    return genreMapping[genreId] || 'Unknown Genre';
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
                {/* Render episodes if available */}
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
};

export default FavouritesPage;
