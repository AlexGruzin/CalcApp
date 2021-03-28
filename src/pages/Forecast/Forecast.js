import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Line as Chart } from 'react-chartjs-2';
import CustomInput from 'components/CustomInput';
import CustomSelect from 'components/CustomSelect';
import SemiHeader from 'components/SemiHeader';
import { useTranslation } from 'react-i18next';
import { DURATION_OPTIONS, forecastChartOptions } from 'constants/forecast';
import { CAMPAIGNS } from 'constants/campaigns';
import { useForm } from 'react-hook-form';
import { updateBudgetRule, updateModelRule, calculateProjectedMargin } from './forecastCalculations';
import Campaigns from './Campaigns';
import GrowthModel from './GrowthModel';

import './Forecast.styles.less';

const Forecast = ({ forecastPrediction, productCost }) => {
  const { register, trigger, handleSubmit, errors } = useForm({ mode: 'all', shouldUnregister: true });
  const [fields, setFields] = useState({});
  const fieldsMutable = useRef(fields);
  const { t } = useTranslation();

  const periodOptions = useMemo(
    () =>
      DURATION_OPTIONS.map(option => ({
        ...option,
        label: t(option.label),
      })),
    [DURATION_OPTIONS, t]
  );

  useEffect(() => {
    trigger();
  }, []);

  const currentPeriod = periodOptions.find(item => item.value === fields.period);

  const fieldOnChange = useCallback(e => {
    const { name, value } = e.target;

    setFields(prevState => {
      fieldsMutable.current = { ...prevState, [name]: value };
      return { ...prevState, [name]: value };
    });

    if (name === 'advertising_budget') {
      // TODO maybe add throttle
      const { goal_revenue } = fieldsMutable.current;
      const result = updateModelRule(+goal_revenue, +value);
      setFields(prevState => ({ ...prevState, growth_model: result }));
    }

    if (name === 'growth_model') {
      // TODO maybe add throttle
      const { goal_revenue } = fieldsMutable.current;
      const result = updateBudgetRule(+goal_revenue, value);
      setFields(prevState => ({ ...prevState, advertising_budget: result }));
    }
  }, []);

  const setModel = useCallback(value => {
    fieldOnChange({ target: { name: 'growth_model', value } });
  }, []);

  const setPeriod = useCallback(({ value }) => {
    fieldOnChange({ target: { name: 'period', value } });
  }, []);

  const handleFormSubmit = () => {
    forecastPrediction(fields);
  };

  // productCost is the cost of all on sale products from the Shopify catalog
  const projectedMargin = calculateProjectedMargin(productCost, fields.goal_revenue, fields.advertising_budget);

  return (
    <div className="forecast">
      <SemiHeader className="forecast__semi-header" label={t('forecast:Forecast')} brand="Clothing Brand X" />
      <div className="forecast__content">
        <div className="forecast__chart-block">
          <form
            onSubmit={handleSubmit(handleFormSubmit)} // runs first time to trigger error state of revenue filed
            name="forecast-form"
            className="forecast__setup-column"
          >
            <h3>{t('forecast:letSetup')}</h3>
            <h4>{t('forecast:howFar')}</h4>
            <CustomSelect
              name="period"
              options={periodOptions}
              value={currentPeriod || periodOptions[0]}
              onChange={setPeriod}
              className="forecast__duration-select"
            />
            <span>
              <h4>{t('forecast:goalRevenue')}</h4>
              <img className="forecast__info-svg" src="/svg/info-circle-1.svg" alt="info-svg" />
            </span>
            {/* // TODO rewrite with https://react-hook-form.com/api#Controller due to this bug https://github.com/react-hook-form/react-hook-form/issues/348 */}
            <CustomInput
              type="number"
              name="goal_revenue"
              className="forecast__goal"
              beforeText="$"
              onChange={fieldOnChange}
              value={fields.goal_revenue}
              ref={register({ valueAsNumber: true, required: true })}
              isError={!!errors.goal_revenue}
              errMessage={errors.goal_revenue?.type || errors.goal_revenue?.message}
            />
            {/* <h6>{'+/- $26,525'}</h6> */}
            <span>
              <h4>{t('forecast:adBudget')}</h4>
              <img className="forecast__info-svg" src="/svg/info-circle-1.svg" alt="info-svg" />
            </span>
            <CustomInput
              type="number"
              name="advertising_budget"
              className="forecast__spend"
              beforeText="$"
              value={fields.advertising_budget}
              ref={register({ valueAsNumber: true })}
              isError={!!errors.advertising_budget}
              onChange={fieldOnChange}
            />
            <h6>{'That comes out to about $145 per day'}</h6>
            <h3 className="forecast__margin">{`${t('forecast:projectMargin')} ${projectedMargin || '-'} %`}</h3>
            <Button type="submit" className="forecast__do-it-btn">
              {t('forecast:doIt')}
            </Button>
          </form>

          <div className="forecast__chart-column">
            <h4>{t('forecast:chartDescription')}</h4>
            <div className="forecast__chart-wrapper">
              <Chart data={forecastChartOptions.data} options={forecastChartOptions.options} />
            </div>
            <div className="forecast__download-wrapper">
              {/* <CustomSelect */}
              {/*  options={DOWNLOAD_OPTIONS} */}
              {/*  defaultValue={DOWNLOAD_OPTIONS[0]} */}
              {/*  className="forecast__download-select" */}
              {/* /> */}
              {/* <Slider className="forecast__download-btn"> */}
              {/*  <span> */}
              {/*    {t('forecast:download')} */}
              {/*    <img src="/svg/download.svg" alt="download svg" /> */}
              {/*  </span> */}
              {/* </Slider> */}
            </div>
          </div>
        </div>
        <GrowthModel onChange={setModel} value={fields.growth_model} />
        <Campaigns items={CAMPAIGNS} />
      </div>
    </div>
  );
};

Forecast.propTypes = {
  forecastPrediction: PropTypes.func.isRequired,
  productCost: PropTypes.number,
};

Forecast.defaultProps = {
  productCost: 0,
};

export default Forecast;
