import React, { useCallback, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { MODEL_TYPES, MODEL_TYPES_NAMES } from 'constants/forecast';

import './GrowthModel.styles.less';

const GrowthModel = ({ onChange, value }) => {
  const { t } = useTranslation();

  const changeModel = model => {
    onChange(model);
  };

  const modelTypesButtons = useCallback(
    () => (
      <form className="forecast__growth-form" id="form">
        {MODEL_TYPES.map((model, index) => (
          <Fragment key={model.value}>
            <input
              onChange={() => changeModel(model.value)}
              type="radio"
              name="modelGroup"
              id={`model${index}`}
              checked={value === model.value}
            />
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <label className="forecast__sets-item-wrapper" htmlFor={`model${index}`}>
              <h3 className="forecast__sets-item">{t(model.label)}</h3>
              <p className="forecast__sets-item-text">{t(model.text)}</p>
            </label>
          </Fragment>
        ))}
      </form>
    ),
    [t, value]
  );

  return (
    <div className="forecast__growth-block">
      <h3>Choose Your Growth Model</h3>

      <div className="forecast__growth-content">
        <div className="forecast__sets-column">{modelTypesButtons()}</div>
        <div className="forecast__model-column">
          <h4>Marketing Funnel Breakdown</h4>
          <div className="forecast__image-column">
            <div className="forecast__image-row">
              <div className="forecast__container-row">
                <div className="forecast__perspective">
                  <div className="forecast__image-block" />
                </div>
                <div className="forecast__description-block">
                  <h3>
                    {[
                      `${t('forecast:moderate.top')} `,
                      <span key="awareness">{t('forecast:moderate.awareness')}</span>,
                    ]}
                  </h3>
                  <p>{t('forecast:moderate.topText')}</p>
                </div>
              </div>
            </div>
            <div className="forecast__image-row">
              <div className="forecast__container-row">
                <div className="forecast__perspective">
                  <div className="forecast__image-block" />
                </div>
                <div className="forecast__description-block">
                  <h3>
                    {[
                      `${t('forecast:moderate.middle')} `,
                      <span key="consideration">{t('forecast:moderate.consideration')}</span>,
                    ]}
                  </h3>
                  <p>{t('forecast:moderate.middleText')}</p>
                </div>
              </div>
            </div>
            <div className="forecast__image-row">
              <div className="forecast__container-row">
                <div className="forecast__perspective">
                  <div className="forecast__image-block" />
                </div>
                <div className="forecast__description-block">
                  <h3>
                    {[
                      `${t('forecast:moderate.bottom')} `,
                      <span key="conversion">{t('forecast:moderate.Conversion')}</span>,
                    ]}
                  </h3>
                  <p>{t('forecast:moderate.bottomText')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GrowthModel.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

GrowthModel.defaultProps = {
  onChange: () => undefined,
  value: MODEL_TYPES_NAMES.MODERATE,
};

export default GrowthModel;
