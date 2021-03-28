import React from 'react';

const Results = ({ handleReset, numAds }) => (
  <>
    <p>A total of {numAds} Google Ads have been created for all in-stock products.</p>
    <div className="linky" onClick={handleReset}>
      Create new Campaign
    </div>
  </>
);

export default Results;
