import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Hero from "./Components/Hero";
import HomePage from "./Components/HomePage";
import OpenPodcast from "./Components/OpenPodcast";
import FavouritesPage from "./Components/FavouritesPage";
import Episode from "./Components/Episode";
import MiniPlayer from "./Components/MiniPlayer";

export default function App() {
  const [favouritePodcasts, setFavouritePodcasts] = useState([]);
  const [miniPlayerData, setMiniPlayerData] = useState(null);
  const [isMiniPlayerPlaying, setIsMiniPlayerPlaying] = useState(false);

  // Load favourited podcasts from local storage on component mount
  useEffect(() => {
    const storedFavourites = localStorage.getItem('favouritePodcasts');
    console.log('Stored Favourites:', storedFavourites);
    if (storedFavourites) {
      setFavouritePodcasts(JSON.parse(storedFavourites));
    }
  }, []);

  // Save favourited podcasts to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('favouritePodcasts', JSON.stringify(favouritePodcasts));
  }, [favouritePodcasts]);

  console.log('Favourite Podcasts in App:', favouritePodcasts);

  // Function to handle opening the mini player
  const handleMiniPlayerOpen = (episodeData) => {
    setMiniPlayerData(episodeData);
    setIsMiniPlayerPlaying(true);
  };

  // Function to handle pausing or playing the mini player
  const handleMiniPlayerPausePlay = () => {
    setIsMiniPlayerPlaying(!isMiniPlayerPlaying);
  };

  // Function to handle closing the mini player
  const handleMiniPlayerClose = () => {
    setMiniPlayerData(null);
    setIsMiniPlayerPlaying(false);
  };

  return (
    <Router>
      <div>
        <Hero />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                favouritePodcasts={favouritePodcasts}
                setFavouritePodcasts={setFavouritePodcasts}
                onMiniPlayerOpen={handleMiniPlayerOpen}
              />
            }
          />
          <Route path="/podcast/:id" element={<OpenPodcast />} />
          <Route
            path="/favourites"
            element={<FavouritesPage favouritePodcasts={favouritePodcasts} />}
          />
          {/* Pass the id prop to the Episode component */}
          <Route
            path="/episode/:id"
            element={<Episode onMiniPlayerOpen={handleMiniPlayerOpen} />}
          />
        </Routes>
        {/* Add the MiniPlayer component */}
        {miniPlayerData && (
          <MiniPlayer
            episodeData={miniPlayerData}
            isPlaying={isMiniPlayerPlaying}
            onPausePlay={handleMiniPlayerPausePlay}
            onClose={handleMiniPlayerClose}
          />
        )}
      </div>
    </Router>
  );
}