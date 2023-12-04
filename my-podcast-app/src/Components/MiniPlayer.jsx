import React, { useRef, useEffect, useState } from 'react';

/**
 * MiniPlayer Component
 * @param {Object} props - Component properties
 * @param {Object} props.episodeData - Data for the currently playing episode
 * @param {boolean} props.isPlaying - Flag indicating whether the audio is playing
 * @param {Function} props.onPausePlay - Callback function for play/pause action
 * @param {Function} props.onClose - Callback function for closing the MiniPlayer
 */
export default function MiniPlayer({ episodeData, isPlaying, onPausePlay, onClose }) {
  // Reference to the audio element
  const audioRef = useRef(new Audio(episodeData.file));

  // State for current time and duration of the audio
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // useEffect to set up event listeners and clean up
  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('ended', () => onPausePlay(false));

    return () => {
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.removeEventListener('ended', () => onPausePlay(false));
    };
  }, [onPausePlay]);

  // useEffect to handle play/pause based on isPlaying prop
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Event handler for updating current time
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Event handler for updating duration on metadata load
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Event handler for seeking in the audio
  const handleSeek = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  // JSX structure for MiniPlayer
  return (
    <div className="mini-player">
      {/* Audio element for playing the episode */}
      <audio ref={audioRef} src={episodeData.file}>
        Your browser does not support the audio element.
      </audio>

      <div>
        {/* Play/Pause button */}
        <button className="play-button" onClick={() => onPausePlay(!isPlaying)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* Display current time and duration */}
        <span className="timestamp">{`${Math.floor(currentTime / 60)}:${(currentTime % 60).toFixed()}`}</span>{' '}
        /{' '}
        <span className="timestamp">{`${Math.floor(duration / 60)}:${(duration % 60).toFixed()}`}</span>

        {/* Seekbar input */}
        <input
          className="seekbar"
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
      </div>
    </div>
  );
}
