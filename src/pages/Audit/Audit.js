import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AUDIT_STORE_COMPLETE, AUDIT_ANALYTICS_COMPLETE, AUDIT_CHANNELS_COMPLETE } from 'constants/audit';
import { ADVERT } from 'constants/advertisment';
import Button from 'components/Button';
import SemiHeader from 'components/SemiHeader';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import * as Routing from 'constants/routing';
import ConnectionFisrtStep from './ConnectionFisrtStep/ConnectionFisrtStep';
import ConnectionSecondStep from './ConnectionSecondStep/ConnectionSecondStep';
import ConnectionThirdStep from './ConnectionThirdStep/ConnectionThirdStep';
import ConnectionLoadStep from './ConnectionLoadStep/ConnectionLoadStep';

import './Audit.styles.less';

const AUDIT_VIEWS = {
  SHOPIFY: 'SHOPIFY',
  GOOGlE_ANALYTICS: 'GOOGlE_ANALYTICS',
  GOOGLE_ADS: 'GOOGLE_ADS',
};

const AUDIT_VIEWS_ORDERED = [AUDIT_VIEWS.SHOPIFY, AUDIT_VIEWS.GOOGlE_ANALYTICS, AUDIT_VIEWS.GOOGLE_ADS];

const Audit = ({
  initShopifyIntegration,
  initGAIntegration,
  initGoogleAdsIntegration,
  initFacebookIntegration,
  initInstagramIntegration,
  auditStep,
  connectionStatus,
  getAuditStatus,
  getAuditRun,
  auditStatus,
  getAuditSteps,
  auditRunFail,
  isAuditStepLoading,
  getAccounts,
  getProperties,
  getViews,
  sendSelectedViewId,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [activeView, setActiveView] = useState(AUDIT_VIEWS.SHOPIFY);
  const [isCanRun, setIsCanRun] = useState(false);

  useEffect(() => {
    if (!isCanRun) {
      switch (connectionStatus) {
        case AUDIT_STORE_COMPLETE:
          setActiveView(AUDIT_VIEWS.GOOGlE_ANALYTICS);
          setIsCanRun(true);
          break;
        case AUDIT_ANALYTICS_COMPLETE:
          setActiveView(AUDIT_VIEWS.GOOGLE_ADS);
          setIsCanRun(true);
          break;
        case AUDIT_CHANNELS_COMPLETE:
          setActiveView(AUDIT_VIEWS.GOOGLE_ADS);
          setIsCanRun(true);
          break;
        default:
          setActiveView(AUDIT_VIEWS.SHOPIFY);
          break;
      }
    }
  }, [connectionStatus, auditStep, isCanRun]);

  const handleRunAudit = async index => {
    setActiveView(index);
    await getAuditRun();
    history.push(Routing.SURVEY);
  };

  useEffect(() => {
    if (activeView === 3) {
      const checkInterval = setInterval(() => {
        localStorage.setItem('import_data', 'true');
        getAuditStatus();
      }, 4000);

      if (auditRunFail) {
        clearInterval(checkInterval);
        localStorage.removeItem('import_data');
      }
    }
  }, [getAuditRun]);

  const goNextView = useCallback(
    () => setActiveView(prevState => AUDIT_VIEWS_ORDERED[AUDIT_VIEWS_ORDERED.indexOf(prevState) + 1]),
    []
  );

  const goPreviousView = useCallback(
    () => setActiveView(prevState => AUDIT_VIEWS_ORDERED[AUDIT_VIEWS_ORDERED.indexOf(prevState) - 1]),
    []
  );

  const handleStorageUpdate = event => {
    const { key, newValue } = event;
    if (!key || !newValue) return;

    // Auto switching audit view
    if (key === 'recentlyConnected') {
      getAuditSteps(); // as we do not store audit step locally, make this request
      switch (newValue) {
        case ADVERT.SHOPIFY:
          goNextView();
          break;
        default:
          break;
      }
      localStorage.setItem('recentlyConnected', '');
    }
  };

  useEffect(() => {
    // TODO add custom hook for that
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageUpdate);
    }

    return () => {
      document.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  const renderView = useCallback(() => {
    if (auditStatus.historical_general) {
      return <ConnectionLoadStep />;
    }
    if (activeView === AUDIT_VIEWS.SHOPIFY) {
      return (
        <ConnectionFisrtStep
          step={connectionStatus}
          initShopifyIntegration={initShopifyIntegration}
          goNextView={goNextView}
        />
      );
    }
    if (activeView === AUDIT_VIEWS.GOOGlE_ANALYTICS) {
      return (
        <ConnectionSecondStep
          step={connectionStatus}
          getAccounts={getAccounts}
          getProperties={getProperties}
          getViews={getViews}
          goNextView={goNextView}
          initGAIntegration={initGAIntegration}
          onClickBackBtn={goPreviousView}
          sendSelectedViewId={sendSelectedViewId}
        />
      );
    }
    if (activeView === AUDIT_VIEWS.GOOGLE_ADS) {
      return (
        <ConnectionThirdStep
          step={connectionStatus}
          initGoogleAdsIntegration={initGoogleAdsIntegration}
          initFacebookIntegration={initFacebookIntegration}
          initInstagramIntegration={initInstagramIntegration}
          onClickBackBtn={goPreviousView}
          runAudit={handleRunAudit}
          isCanRunAudit={isCanRun}
          getAccountsAds={getAccounts}
          getPropertiesAds={getProperties}
          getViewsAds={getViews}
          sendSelectedViewIdAds={sendSelectedViewId}
        />
      );
    }
  }, [activeView]);

  return (
    <>
      <div className="audit" id="audit">
        <SemiHeader className="audit__semi-header" label={t('audit:title')} brand="Clothing Brand X" />
        <div className="audit__content">
          <div className="audit__stores-column">
            <div className={classNames('audit__stores-block', { disabled: isAuditStepLoading })}>
              <h4 className="audit__stores-label">
                {t('audit:seeAllYourMarketing')} <span>{t('audit:onePlace')}</span>
              </h4>
              <h3 className="audit__text">{t('audit:connectYourStore')}</h3>
              {auditRunFail ? 'Error!' : renderView()}
            </div>
          </div>

          <div className="audit__tips-column">
            <div className={classNames('audit__tip-block', 'tip-block--top')}>
              <h3>{t('audit:threeEasySteps')}</h3>
              <p>{t('audit:auditItem')}</p>
              <p>{t('audit:forecastItem')}</p>
              <p>{t('audit:curateItem')}</p>
              <hr />
              <h3>{t('audit:deacadesOfExperience')}</h3>
              <p>{t('audit:workingWithClients')}</p>
              <hr />
              <h3>{t('audit:handleTheGuesswork')}</h3>
              <p>{t('audit:ourCalcBots')}</p>
            </div>

            <div className="audit__tip-block tip-block--bottom">
              <div>
                <img src="/svg/lightbulb.svg" alt="lightbulb svg" />
                <h3>{t('audit:proTip')}</h3>
              </div>
              <p className="audit__many-stores">{t('audit:manyStores')}</p>
              <Button onClick={() => undefined} className="audit__learn-more">
                {['Learn more', <img key="arrow svg" src="/svg/arrow.svg" alt="arrow svg" />]}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Audit.propTypes = {
  initShopifyIntegration: PropTypes.func.isRequired,
  initGAIntegration: PropTypes.func.isRequired,
  initGoogleAdsIntegration: PropTypes.func.isRequired,
  initFacebookIntegration: PropTypes.func.isRequired,
  initInstagramIntegration: PropTypes.func.isRequired,
  auditStep: PropTypes.object.isRequired,
  auditStatus: PropTypes.object.isRequired,
  getAuditRun: PropTypes.func.isRequired,
  getAuditStatus: PropTypes.func.isRequired,
  isAuditStepLoading: PropTypes.bool.isRequired,
  auditRunFail: PropTypes.bool.isRequired,
  getAccounts: PropTypes.func.isRequired,
  getProperties: PropTypes.func.isRequired,
  getViews: PropTypes.func.isRequired,
  getAuditSteps: PropTypes.func.isRequired,
  sendSelectedViewId: PropTypes.func.isRequired,
  connectionStatus: PropTypes.string.isRequired,
};

export default Audit;
