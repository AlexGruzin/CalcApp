import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import ArrowProgressBar from 'components/ArrowProgressBar';
import { AUDIT_ANALYTICS_COMPLETE, AUDIT_CHANNELS_COMPLETE } from 'constants/audit';
import classNames from 'classnames';
import CustomSelect from 'components/CustomSelect';
import Spinner from 'components/Spinner';
import { ADVERT } from 'constants/advertisment';

const ConnectionSecondStep = ({
  initGAIntegration,
  step,
  onClickBackBtn,
  goNextView,
  getAccounts,
  getProperties,
  getViews,
  sendSelectedViewId,
}) => {
  const [gaToken, setGaToken] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [views, setViews] = useState([]);
  const [selectedView, setSelectedView] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const { t } = useTranslation();

  const handleGASubmit = () => {
    initGAIntegration();
  };

  const handleStorageUpdate = event => {
    const { key, newValue } = event;
    if (!key || !newValue) return;

    if (key === 'ga_tkn') {
      setGaToken(newValue);
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
      if (gaToken) {
        getAccounts(gaToken)
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
  }, [gaToken, getAccounts]);

  useEffect(() => {
    (async () => {
      if (selectedAccount && gaToken) {
        getProperties(selectedAccount.value, gaToken)
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
  }, [selectedAccount, gaToken]);

  useEffect(() => {
    (async () => {
      if (selectedProperty && gaToken) {
        getViews(selectedAccount.value, selectedProperty.value, gaToken)
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
  }, [selectedProperty, gaToken]);

  const saveView = useCallback(() => {
    (async () => {
      if (selectedView) {
        await sendSelectedViewId({ id: selectedView.value, type: ADVERT.GOOGlE_ANALYTICS });
        await setIsSaved(true);
        goNextView();
      }
    })();
  }, [selectedView]);

  return (
    // TODO Add specified classnames
    <>
      <div className="audit__arrows">
        <ArrowProgressBar activeIndex={1} />
      </div>
      <h2 className="audit__list-label">
        {t('audit:analytics')} <span>({t('audit:optional')})</span>
      </h2>

      <div className="block-list">
        <div onClick={handleGASubmit} className="block-list__item google-analitics-logo">
          <div
            className={classNames('block-list__indicator', {
              isActive: step === AUDIT_ANALYTICS_COMPLETE || step === AUDIT_CHANNELS_COMPLETE,
            })}
          >
            Connected
          </div>
          <div>
            <img className="block-list__item-inner" src="/images/google-analitics-logo.png" alt="Google ads logo" />
          </div>
        </div>
        <div className="ga-account-settings">
          {!accounts && gaToken && <h5>You have no any GA accounts</h5>}
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
          ) : gaToken ? (
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
      </div>
      <div className="audit__buttons">
        <Button onClick={onClickBackBtn} className="audit__lets-go">
          {t(`audit:back`)}
        </Button>
        <Button
          onClick={goNextView}
          className={classNames('audit__lets-go', {
            isDisabled: !!gaToken,
          })}
          disabled={gaToken && !isSaved}
        >
          {t(`audit:next`)}
        </Button>
      </div>
    </>
  );
};

ConnectionSecondStep.propTypes = {
  step: PropTypes.string,
  initGAIntegration: PropTypes.func.isRequired,
  onClickBackBtn: PropTypes.func.isRequired,
  getAccounts: PropTypes.func.isRequired,
  getProperties: PropTypes.func.isRequired,
  getViews: PropTypes.func.isRequired,
  goNextView: PropTypes.func.isRequired,
  sendSelectedViewId: PropTypes.func.isRequired,
};

ConnectionSecondStep.defaultProps = {
  step: '',
};

export default ConnectionSecondStep;
