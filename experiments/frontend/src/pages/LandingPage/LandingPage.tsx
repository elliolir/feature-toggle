import React from 'react';

import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-container">
      <h1 data-test-id="landing-page-header" className="landing-page">
        LandingPage
      </h1>
    </div>
  );
};
export default LandingPage;
