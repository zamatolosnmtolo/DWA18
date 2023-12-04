import React from 'react';
import './Hero.css';

/**
 * Header Component for the hero section.
 * Displays the title and subtitle for the "Soundify" website.
 */
const Header = () => {
  return (
    <div className='hero'>
      {/* Main title of the hero section */}
      <h1 className='hero--title'>Soundify</h1>
      {/* Subtitle welcoming users to the podcast heaven */}
      <h2 className='hero--subtitle'>Your Podcast Heaven, Welcome</h2>
    </div>
  );
}

export default Header;
