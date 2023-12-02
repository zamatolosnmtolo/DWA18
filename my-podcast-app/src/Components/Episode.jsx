// Updated React Component

import React, { useState, useRef } from 'react';
import './Episode.css';

export default function Episode({ episodeData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div>
      <h2 className='episode-number'>Episode {episodeData.episode}</h2>
      <h4 className='episode-title'>{episodeData.title}</h4>
      <p className='episode-description'>{episodeData.description}</p>

      {/* Audio Player */}
      <audio
        ref={audioRef}
        src={episodeData.file}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        Your browser does not support the audio element.
      </audio>

      <div>
        {/* Play/Pause Button */}
        <button 
        className='play-button'
        onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>

        {/* Time Stamp */}
        <span className='timestamp'>{`${Math.floor(currentTime / 60)}:${(currentTime % 60).toFixed()}`}</span> /{' '}
        <span className='timestamp'>{`${Math.floor(duration / 60)}:${(duration % 60).toFixed()}`}</span>

        {/* Seekable Progress Bar */}
        <input 
        className='seekbar'
        type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />
      </div>
    </div>
  );
}
