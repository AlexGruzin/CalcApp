import React, { useState } from 'react';
import { API_PATH, API_DOMAIN } from 'constants/envConstants';
import { formatLoad } from 'formatters/loader';
import { getAccessToken } from 'helpers/services/storage';
import Results from './Results';

const CampaignForm = () => {
  const [numAds, setNumAds] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [clientChoice, setClientChoice] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const Spinner = () => (
    <div>
      Loading.... <img src="/images/loading.gif" alt="loading" />
    </div>
  );

  const handleMenuChoice = event => {
    setClientChoice(event.target.value);
  };

  const handleNameOnChange = event => {
    setCampaignName(event.target.value);
  };

  const handleReset = event => {
    setCampaignName('');
    setShowResults(false);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    setShowSpinner(true);
    const loadData = formatLoad({ clientChoice, campaignName });
    try {
      const res = await fetch(`${API_DOMAIN}${API_PATH}/load/v2/campaign`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
        method: 'POST',
        body: JSON.stringify(loadData),
      });
      const text = await res.text();
      setNumAds(text);
      setShowSpinner(false);
      setShowResults(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} name="campaign-form">
        <table className="tbl">
          <tbody>
            <tr>
              <td>Client:</td>
              <td>
                <select className="fmenu" onChange={handleMenuChoice} required>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <option value="" />
                  <option value="1">Alloy</option>
                </select>
                {/* <span>{clientChoice}</span> */}
              </td>
            </tr>
            <tr>
              <td>Campaign Name:</td>
              <td>
                <input type="text" value={campaignName} name="name" onChange={handleNameOnChange} required />
              </td>
            </tr>
            <tr>
              <td />
              <td>
                {showResults ? (
                  <Results handleReset={handleReset} numAds={numAds} />
                ) : (
                  <input type="submit" value="Create" />
                )}
                {showSpinner ? <Spinner /> : null}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default CampaignForm;
