import React from 'react';
import CampaignForm from './CampaignForm';

import '../Load.styles.less';

const Campaign = () => (
  <>
    <div className="load">
      <div className="load__content">
        <h1>Create Campaign</h1>
        <p>Enter a campain name to create google ads for all in-stock products.</p>
        <CampaignForm />
      </div>
    </div>
  </>
);

export default Campaign;
