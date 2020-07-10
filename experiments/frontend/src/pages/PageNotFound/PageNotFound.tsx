import React from 'react';

import './PageNotFound.css';

const PageNotFound: React.FC = () => {
  return (
    <div className="page-not-found-container">
      <h1 data-test-id="page-not-found-header" className="page-not-found">
        Page Not Found
      </h1>
    </div>
  );
};
export default PageNotFound;
