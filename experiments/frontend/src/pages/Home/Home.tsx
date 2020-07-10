import React from 'react';

import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 data-test-id="home-header" className="home">
        Home
      </h1>
    </div>
  );
};
export default Home;
