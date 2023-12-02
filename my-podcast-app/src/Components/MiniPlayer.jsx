import React, { useRef, useEffect, useState } from 'react';

export default function MiniPlayer({
  episodeData,
  isPlaying,
  onPausePlay,
  onClose,
}) {
  const audioRef = useRef(new Audio(episodeData.file));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="mini-player">
      <audio ref={audioRef} src={episodeData.file}>
        Your browser does not support the audio element.
      </audio>

      <div>
        <button className="play-button" onClick={() => onPausePlay(!isPlaying)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <span className="timestamp">{`${Math.floor(currentTime / 60)}:${(
          currentTime % 60
        ).toFixed()}`}</span>{' '}
        /{' '}
        <span className="timestamp">{`${Math.floor(duration / 60)}:${(
          duration % 60
        ).toFixed()}`}</span>

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

//MiniPlayer ver.2