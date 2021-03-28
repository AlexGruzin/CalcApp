import React from 'react';
// import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as ROUTES from 'constants/routing';
import { Link } from 'react-router-dom';
import Spinner from 'components/Spinner';

const ConnectionLoadStep = () => {
  const { t } = useTranslation();

  return (
    <div className="audit-load-wrap">
      <p>{t('audit:connectionLoad.weWorkingHard')}</p>
      <Spinner className="audit__spinner" />
      <p>{t('audit:connectionLoad.evenThoughAudits')}</p>
      <p>
        {t('audit:connectionLoad.forNow')}
        <Link to={ROUTES.FORECAST} className="audit-load__link">
          {t('audit:forecast')}
        </Link>
        {t('audit:connectionLoad.toBegin')}
      </p>
    </div>
  );
};

ConnectionLoadStep.propTypes = {};

ConnectionLoadStep.defaultProps = {};

export default ConnectionLoadStep;
