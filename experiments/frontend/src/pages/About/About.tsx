import React from 'react';

import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1 data-test-id="about-header" className="about">
        About
      </h1>
    </div>
  );
};
export default About;
