import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './HomePage.css';
import './openpodcast.css';
import Episode from './Episode';
import MiniPlayer from './MiniPlayer';

// Main component for the podcast page
export default function PodcastPage() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [error, setError] = useState(null);
  const [visibility, setVisibility] = useState({});
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  // Fetch podcast data when the component mounts or when the ID changes
  useEffect(() => {
    const fetchPodcastData = async () => {
      if (!id) {
        setError('Podcast ID is not provided.');
        return;
      }

      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPodcast(data);
        setVisibility({});
      } catch (error) {
        console.error('Error fetching podcast data:', error);
        setError('Error fetching podcast data. Please try again later.');
      }
    };

    fetchPodcastData();
  }, [id]);

  // Toggle visibility for seasons and episodes
  const toggleVisibility = (key) => setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));

  // Show the MiniPlayer with the selected episode
  const handleShowMiniPlayer = (episodeData) => {
    setSelectedEpisode(episodeData);
    setShowMiniPlayer(true);
  };

  // Close the MiniPlayer
  const handleCloseMiniPlayer = () => setShowMiniPlayer(false);

  // Render loading state if podcast data is still being fetched
  if (!podcast) {
    return <div>Loading...</div>;
  }

  // Render error state if there is an error fetching podcast data
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the main podcast page
  return (
    <div className="podcast-page">
      <div className="podcast-info">
        {/* Podcast Information */}
        <h2 className="podcast-name">{podcast.title}</h2>
        {podcast.image && (
          <img
            className="podcast-Coverimage"
            src={podcast.image}
            alt={podcast.title}
            style={{ maxWidth: '100px' }}
          />
        )}
        <p className="podcast-page-descciption">{podcast.description}</p>
        <p className="podcast-page-last-updated">
          Updated: {new Date(podcast.updated).toLocaleDateString('en-GB')}
        </p>
      </div>

      {/* Seasons and Episodes List */}
      {Array.isArray(podcast.seasons) && podcast.seasons.length > 0 ? (
        <div className="season-list">
          {podcast.seasons.map((season) => (
            <div key={`season-${season.season}`} className="season-item">
              <h3>
                {/* Toggle visibility when the season title is clicked */}
                <div style={{ cursor: 'pointer' }} onClick={() => toggleVisibility(season.season)}>
                  <h4 className="season-card-title">Season {season.season}</h4>
                  <img
                    className="season-card-image"
                    src={season.image}
                    alt={`Season ${season.season}`}
                    style={{ maxWidth: '100px' }}
                  />
                </div>
              </h3>
              {visibility[season.season] &&
                (Array.isArray(season.episodes) && season.episodes.length > 0 ? (
                  season.episodes.map((episode, index) => (
                    <div key={`episode-${season.season}-${episode.id || index}`} className="episode-item">
                      <h4>
                        {/* Display episode information */}
                        <Episode episodeData={episode} />
                      </h4>
                      {visibility[season.season]?.[index] && <p>{episode.description}</p>}
                    </div>
                  ))
                ) : (
                  <div key={`episode-${season.season}-no-episodes`}>No episodes available for this season.</div>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <div>No seasons available for this podcast.</div>
      )}

      {/* MiniPlayer */}
      {selectedEpisode && (
        <MiniPlayer episodeData={selectedEpisode} handleClose={handleCloseMiniPlayer} />
      )}
    </div>
  );
}
