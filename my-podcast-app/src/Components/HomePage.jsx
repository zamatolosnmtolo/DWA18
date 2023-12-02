import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MiniPlayer from './MiniPlayer';
import Carousel from './Carousel';

// Mapping for podcast genres
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

// Function to fetch podcast data from the API
const fetchPodcasts = async (setPodcasts) => {
  try {
    // Fetch data from the API
    const response = await axios.get('https://podcast-api.netlify.app/shows');

    // Process and update podcast data
    const podcastsData = response.data.map((podcast) => {
      const validGenres = Array.isArray(podcast.genre) &&
        podcast.genre.length > 0 &&
        typeof podcast.genre[0] === 'number';

      const genreTitle = validGenres
        ? genreMapping[podcast.genre[0]] || 'Unknown Genre'
        : 'Unknown Genre';

      return {
        ...podcast,
        genre: genreTitle,
      };
    });

    setPodcasts(podcastsData);
  } catch (error) {
    // Handle errors if any
    console.error('Error fetching podcasts:', error);
  }
};

// Function to handle displaying the mini player
const handleShowMiniPlayer = (podcast, setSelectedEpisode, setShowMiniPlayer, audioRef) => {
  const firstEpisode = podcast.episodes[0];

  // Set the selected episode and show the mini player
  setSelectedEpisode(firstEpisode);
  setShowMiniPlayer(true);

  // Play the audio directly
  if (audioRef.current) {
    audioRef.current.src = firstEpisode.file;
    audioRef.current.play();
  }
};

// The main component
const HomePage = ({ favouritePodcasts, setFavouritePodcasts, onMiniPlayerOpen }) => {
  // State variables
  const [podcasts, setPodcasts] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const audioRef = useRef(null);

  // Fetch podcasts on component mount
  useEffect(() => {
    fetchPodcasts(setPodcasts);
  }, []);

  // Function to handle "Read More" or "Read Less" button click
  const handleReadMoreClick = (podcastId) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [podcastId]: !prevState[podcastId],
    }));
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle sort dropdown change
  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  // Function to handle favorite button click
  const handleFavoriteClick = (podcastId) => {
    const isFavorited = favouritePodcasts.some((podcast) => podcast.id === podcastId);

    if (isFavorited) {
      // If already favorited, remove from favorites
      setFavouritePodcasts((prevFavorites) => prevFavorites.filter((podcast) => podcast.id !== podcastId));
    } else {
      // If not favorited, add to favorites
      const podcastToAdd = podcasts.find((podcast) => podcast.id === podcastId);
      if (podcastToAdd) {
        setFavouritePodcasts((prevFavorites) => [...prevFavorites, podcastToAdd]);
      }
    }
  };

  // Sorting logic for podcasts
  const sortedPodcasts = [...podcasts].sort((a, b) => {
    if (sortBy === 'a-z') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'z-a') {
      return b.title.localeCompare(a.title);
    } else if (sortBy === 'date-asc') {
      return new Date(a.updated).getTime() - new Date(b.updated).getTime();
    } else if (sortBy === 'date-desc') {
      return new Date(b.updated).getTime() - new Date(a.updated).getTime();
    }
    return 0;
  });

  // Filtering logic based on search term
  const filteredPodcasts = sortedPodcasts.filter((podcast) => {
    const title = podcast.title.toLowerCase();
    const description = podcast.description.toLowerCase();
    return title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
  });

  // Function to handle closing the mini player
  const handleCloseMiniPlayer = () => {
    setShowMiniPlayer(false);
  };

  // JSX structure
  return (
    <div className="all-podcasts-container">
      {/* Display the carousel component */}
      <Carousel />

      {/* Sort and search container */}
      <div className="sort-search-container">
        {/* Dropdown for sorting */}
        <select onChange={(e) => handleSortChange(e.target.value)}>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="date-asc">Oldest to Newest</option>
          <option value="date-desc">Newest to Oldest</option>
        </select>

        {/* Input for searching podcasts */}
        <input
          className='podcast-search-bar'
          type="text"
          placeholder="Search Podcasts"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Button to navigate to the Favourites page */}
      <button className='faveList--button'>
        <Link to="/favourites" style={{ color: 'white' }}>Favourites</Link>
      </button>

      {/* Display the list of podcasts */}
      <div className="podcasts-list">
        {filteredPodcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-item">
            {/* Link to navigate to the individual podcast page */}
            <Link to={`/podcast/${podcast.id}`}>
              <img src={podcast.image} alt={podcast.title} />
              <h3 className='podcast--title'>{podcast.title}</h3>
            </Link>
            {/* Display podcast description with "Read More" button */}
            <p>
              {expandedDescription[podcast.id]
                ? podcast.description
                : `${podcast.description.slice(0, 100)}...`}
            </p>
            {/* Display podcast details */}
            <div className="podcast-details">
              <p className='all-podcasts-card-genre'>
                Genre: {podcast.genre
                  ? (Array.isArray(podcast.genre)
                    ? podcast.genre.map(genreId => genreMapping[genreId] || 'Unknown Genre').join(', ')
                    : (genreMapping[podcast.genre] || 'Unknown Genre'))
                  : 'Unknown Genre'}
              </p>
              <p className='all-podcasts-card-season-no'>Seasons: {podcast.seasons}</p>
              <p className='all-podcasts-card-date'>Updated: {new Date(podcast.updated).toLocaleDateString('en-GB')}</p>
            </div>
            {/* "Read More" / "Read Less" button */}
            <button
              className="read-more-btn"
              onClick={() => handleReadMoreClick(podcast.id)}
            >
              {expandedDescription[podcast.id] ? 'Read Less' : 'Read More'}
            </button>
            {/* Button to play the first episode */}
            <button
              className="play-btn"
              onClick={() => handleShowMiniPlayer(podcast, setSelectedEpisode, setShowMiniPlayer, audioRef)}
            >
              Play Episode
            </button>
            {/* Button to add/remove from favorites */}
            <button
              className="favourite-btn"
              onClick={() => handleFavoriteClick(podcast.id)}
            >
              {favouritePodcasts.some((favPodcast) => favPodcast.id === podcast.id) ? '★' : '☆'}
            </button>
          </div>
        ))}
      </div>

      {/* Display the mini player if showMiniPlayer is true */}
      {showMiniPlayer && (
        <MiniPlayer
          episodeData={selectedEpisode}
          handleClose={handleCloseMiniPlayer}
        />
      )}
    </div>
  );
};

export default HomePage;
