import React, { useState, useRef } from 'react';
import './Favourites.css';
import SortDropdown from './SortDropdown';

export default function Favourites({ favouritePodcasts, onToggleFavourite }) {
  const [sortingOrder, setSortingOrder] = useState(""); // Remove initial sorting order state


  return (
    <div>
      <h2>Your Favourite Podcasts</h2>
      <div className="sorting-buttons">
        {/* Remove existing buttons for Sort A-Z, Sort Z-A, etc. */}
        {/* Integrate the SortDropdown component */}
        <SortDropdown onSortChange={handleSortChange} />
      </div>
      {favouritePodcasts.map((podcast) => (
        <div key={podcast.id} className="favourite-podcast">
          <img src={podcast.image} alt={podcast.title} className="podcast-image" />
          <p className="podcast-title">{podcast.title}</p>
          <button onClick={() => onToggleFavourite(podcast.id)}>
            {podcast.isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
          </button>
        </div>
      ))}
    </div>
  );
}