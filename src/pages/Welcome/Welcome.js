import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as Routing from 'constants/routing';
import Button from 'components/Button';
import { USER_STATUS } from 'constants/audit';

import './Welcome.styles.less';

const Welcome = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const parsedQuery = new URLSearchParams(window.location.search);
  const pageStatus = parsedQuery.get('status');

  return (
    <div className="welcome-p">
      <div className="welcome-p__content">
        <h1 className="welcome-p__welcome-word">{t('welcome:welcome')}</h1>
        {pageStatus === USER_STATUS.FIRST_TIME && (
          <>
            <p className="welcome-p__description">{t('welcome:first')}</p>
            <Button className="welcome-p__go-btn" onClick={() => history.push(Routing.AUDIT)}>
              {t('welcome:goAudit')}
            </Button>
          </>
        )}
        {pageStatus === USER_STATUS.AUDIT_PASSED && (
          <>
            <p className="welcome-p__description">{t('welcome:passed')}</p>
            <Button className="welcome-p__go-btn" onClick={() => history.push(Routing.DASHBOARD)}>
              {t('welcome:goDashboard')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
