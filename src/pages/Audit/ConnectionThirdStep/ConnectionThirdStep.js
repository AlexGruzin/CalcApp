import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import ArrowProgressBar from 'components/ArrowProgressBar';
import BlockList from 'components/BlockList';
import { AUDIT_CHANNELS_COMPLETE, ADVERTISING_CHANNELS } from 'constants/audit';
import { ADVERT } from 'constants/advertisment';
import CustomSelect from 'components/CustomSelect';
import Spinner from 'components/Spinner';

const ConnectionThirdStep = ({
  step,
  initGoogleAdsIntegration,
  initFacebookIntegration,
  initInstagramIntegration,
  onClickBackBtn,
  runAudit,
  isCanRunAudit,
  getAccountsAds,
  getPropertiesAds, // TODO looks like ads and analytics share same accounts through the same endpoints
  getViewsAds,
  sendSelectedViewIdAds,
}) => {
  const [token, setToken] = useState(''); // TODO this logic should moved to form and reused on the second step
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [views, setViews] = useState([]);
  const [selectedView, setSelectedView] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const { t } = useTranslation();

  const handleStorageUpdate = event => {
    const { key, newValue } = event;
    if (!key || !newValue) return;

    if (key === 'ga_tkn') {
      setToken(newValue);
      localStorage.setItem('ga_tkn', '');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageUpdate);
    }

    return () => {
      document.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (token) {
        getAccountsAds(token)
          .then(res => {
            if (!res.error) {
              setAccounts(res.payload.items.map(item => ({ value: item.id, label: item.name })));
            } else {
              // eslint-disable-next-line no-console
              console.log(res); // TODO show error ui
            }
          })
          // eslint-disable-next-line no-console
          .catch(e => console.log(e));
      }
    })();
  }, [token, getAccountsAds]);

  useEffect(() => {
    (async () => {
      if (selectedAccount && token) {
        getPropertiesAds(selectedAccount.value, token)
          .then(res => {
            if (!res.error) {
              setProperties(res.payload.items.map(item => ({ value: item.id, label: item.name })));
            } else {
              // eslint-disable-next-line no-console
              console.log(res); // TODO show error ui
            }
          })
          // eslint-disable-next-line no-console
          .catch(e => console.log(e));
      }
    })();
  }, [selectedAccount, token]);

  useEffect(() => {
    (async () => {
      if (selectedProperty && token) {
        getViewsAds(selectedAccount.value, selectedProperty.value, token)
          .then(res => {
            if (!res.error) {
              setViews(res.payload.items.map(item => ({ value: item.id, label: item.id })));
            } else {
              // eslint-disable-next-line no-console
              console.log(res); // TODO show error ui
            }
          })
          // eslint-disable-next-line no-console
          .catch(e => console.log(e));
      }
    })();
  }, [selectedProperty, token]);

  const saveView = useCallback(() => {
    (async () => {
      if (selectedView) {
        await sendSelectedViewIdAds({ id: selectedView.value, type: ADVERT.GOOGLE_ADS });
        await setIsSaved(true);
      }
    })();
  }, [selectedView]);

  const handleItemClick = data => {
    switch (data.name) {
      case ADVERT.INSTAGRAM:
        initInstagramIntegration();
        break;
      case ADVERT.GOOGLE_ADS:
        initGoogleAdsIntegration();
        break;
      case ADVERT.FACEBOOK:
        initFacebookIntegration();
        break;
      default: {
        break;
      }
    }
  };

  return (
    <>
      <div className="audit__arrows">
        <ArrowProgressBar activeIndex={2} />
      </div>
      <h2 className="audit__list-label">
        {t('audit:advertisingChannels')} <span>({t('audit:optional')})</span>
      </h2>
      <BlockList handleClick={handleItemClick} items={ADVERTISING_CHANNELS} step={step} />
      <div className="ga-account-settings">
        {!accounts && token && <h5>You have no any Ads accounts</h5>}
        {/* eslint-disable-next-line no-nested-ternary */}
        {accounts?.length ? (
          <>
            <h4>Please set up google analytics:</h4>
            <CustomSelect
              label="Accounts"
              options={accounts}
              defaultValue={undefined}
              value={selectedAccount}
              placeholder="Chose account"
              onChange={value => setSelectedAccount(value)}
            />
          </>
        ) : token ? (
          <Spinner className="audit__relative-spinner" />
        ) : null}
        {/* eslint-disable-next-line no-nested-ternary */}
        {selectedAccount && properties?.length ? (
          <CustomSelect
            label="Property"
            options={properties}
            value={selectedProperty}
            defaultValue={undefined}
            placeholder="Chose property"
            onChange={value => setSelectedProperty(value)}
          />
        ) : selectedAccount ? (
          <Spinner className="audit__relative-spinner" />
        ) : null}
        {/* eslint-disable-next-line no-nested-ternary */}
        {selectedProperty && views?.length ? (
          <CustomSelect
            label="View"
            options={views}
            value={selectedView}
            defaultValue={undefined}
            placeholder="Chose view"
            onChange={value => setSelectedView(value)}
          />
        ) : selectedProperty ? (
          <Spinner className="audit__relative-spinner" />
        ) : null}
        {accounts?.length ? (
          <Button onClick={saveView} className="audit__save-btn" disabled={!selectedView}>
            {t(`audit:save`)}
          </Button>
        ) : null}
      </div>
      <div className="audit__buttons">
        <Button onClick={onClickBackBtn} className="audit__lets-go">
          {t(`audit:back`)}
        </Button>
        {isCanRunAudit && (
          <Button onClick={() => runAudit(3)} className="audit__lets-go">
            {t(`audit:runMyAudit`)}
          </Button>
        )}
      </div>
    </>
  );
};

ConnectionThirdStep.propTypes = {
  step: PropTypes.string,
  initGoogleAdsIntegration: PropTypes.func.isRequired,
  initFacebookIntegration: PropTypes.func.isRequired,
  initInstagramIntegration: PropTypes.func.isRequired,
  runAudit: PropTypes.func.isRequired,
  onClickBackBtn: PropTypes.func.isRequired,
  isCanRunAudit: PropTypes.bool.isRequired,
  getAccountsAds: PropTypes.func.isRequired,
  getPropertiesAds: PropTypes.func.isRequired,
  getViewsAds: PropTypes.func.isRequired,
  sendSelectedViewIdAds: PropTypes.func.isRequired,
};

ConnectionThirdStep.defaultProps = {
  step: '',
};

export default ConnectionThirdStep;
