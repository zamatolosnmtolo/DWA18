import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MiniPlayer from './MiniPlayer';
import Carousel from './Carousel';


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


const HomePage = ({ favouritePodcasts, setFavouritePodcasts, onMiniPlayerOpen }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

useEffect(() => {
  axios
    .get('https://podcast-api.netlify.app/shows')
    .then((response) => {
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
    })
    .catch((error) => {
      console.error('Error fetching podcasts:', error);
    });
}, []);


  const handleReadMoreClick = (podcastId) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [podcastId]: !prevState[podcastId],
    }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  const handleFavoriteClick = (podcastId) => {
    const isFavorited = favouritePodcasts.some((podcast) => podcast.id === podcastId);

    if (isFavorited) {
      setFavouritePodcasts((prevFavorites) => prevFavorites.filter((podcast) => podcast.id !== podcastId));
    } else {
      const podcastToAdd = podcasts.find((podcast) => podcast.id === podcastId);
      if (podcastToAdd) {
        setFavouritePodcasts((prevFavorites) => [...prevFavorites, podcastToAdd]);
      }
    }
  };

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

  const filteredPodcasts = sortedPodcasts.filter((podcast) => {
    const title = podcast.title.toLowerCase();
    const description = podcast.description.toLowerCase();
    return title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
  });

const handleShowMiniPlayer = (podcast) => {
  const firstEpisode = podcast.episodes[0]; // Assuming episodes are available
    const audioRef = useRef(null);

  // Set the selected episode and show the mini player
  setSelectedEpisode(firstEpisode);
  setShowMiniPlayer(true);

  // Play the audio directly
  if (audioRef.current) {
    audioRef.current.src = firstEpisode.file;
    audioRef.current.play();
  }
};



  const handleCloseMiniPlayer = () => {
    setShowMiniPlayer(false);
  };

  return (
    <div className="all-podcasts-container">
      <Carousel />

      <div className="sort-search-container">
        <select onChange={(e) => handleSortChange(e.target.value)}>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="date-asc">Oldest to Newest</option>
          <option value="date-desc">Newest to Oldest</option>
        </select>

        <input
          className='podcast-search-bar'
          type="text"
          placeholder="Search Podcasts"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

<button className='faveList--button'>
  <Link to="/favourites" style={{ color: 'white' }}>Favourites</Link>
</button>

      <div className="podcasts-list">
        {filteredPodcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-item">
            <Link to={`/podcast/${podcast.id}`}>
              <img src={podcast.image} alt={podcast.title} />
              <h3 className='podcast--title'>{podcast.title}</h3>
            </Link>
            <p>
              {expandedDescription[podcast.id]
                ? podcast.description
                : `${podcast.description.slice(0, 100)}...`}
            </p>
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
            <button
              className="read-more-btn"
              onClick={() => handleReadMoreClick(podcast.id)}
            >
              {expandedDescription[podcast.id] ? 'Read Less' : 'Read More'}
            </button>
            <button
              className="play-btn"
              onClick={() => handleShowMiniPlayer(podcast)}
            >Play Episode
            </button>
            <button
              className="favourite-btn"
              onClick={() => handleFavoriteClick(podcast.id)}
            >
              {favouritePodcasts.some((favPodcast) => favPodcast.id === podcast.id) ? '★' : '☆'}
            </button>
          </div>
        ))}
      </div>

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
