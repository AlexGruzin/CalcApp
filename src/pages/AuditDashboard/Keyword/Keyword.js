import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import maxBy from 'lodash/maxBy';
// import { KEYWORD_DATA } from 'constants/auditDashboard';

const KeywordComponent = ({ data }) => {
  const { t } = useTranslation();

  const firstFiveWords = data.length ? data.slice(0, 5) : [];
  const maxImpression = data[0]?.impressions || 0;
  const maxAdSpend = maxBy(data, 'adSpend')?.adSpend || 0;
  const maxWidth = 147;

  return (
    <div className="content-block">
      <h5 className="content-block__title">{t('auditDashboard:keyword.title')}</h5>
      <p>It looks like you are spending a lot of money on keywords that don’t necessarily perform very well.</p>
      <div className="content-block__table">
        <div className="content-block__table-head">
          <div>{t('auditDashboard:keyword.spend')}</div>
          <div>{t('auditDashboard:keyword.keyword')}</div>
          <div>{t('auditDashboard:keyword.volume')}</div>
        </div>
        <div className="content-block__table-body">
          {firstFiveWords.map((item, index) => {
            const impRelative = (maxWidth * item.impressions) / maxImpression;
            const impAdSpend = (maxWidth * item.adSpend) / maxAdSpend;

            return (
              <div className="content-block__table-row keyword" key={`${item.name}${index}`}>
                <div className="content-block__table-line right">
                  <div style={{ width: `${impAdSpend}%` }} />
                </div>
                <div className="content-block__table-item center">{item.name}</div>
                <div className="content-block__table-line">
                  <div style={{ width: `${impRelative}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="content-block__footer">
        {t('auditDashboard:seeMore')}
        <img src="/svg/arrow-black.svg" alt="next" />
      </div>
    </div>
  );
};

KeywordComponent.propTypes = {
  data: PropTypes.array,
};

KeywordComponent.defaultProps = {
  data: [],
};

export default KeywordComponent;
