import React, { useMemo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatPostSurvey } from 'formatters/survey';
import Button from 'components/Button';
import { remove } from 'lodash';
import { SURVEY_INDUSTRY } from 'constants/survey';
import { useHistory } from 'react-router-dom';
import CustomInput from 'components/CustomInput';
import CustomSelect from 'components/CustomSelect';
import * as Routing from 'constants/routing';

import './Survey.styles.less';

const Survey = ({ postSurveyData, data }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [values, setValues] = useState({});
  const [slogansAmount, setSlogansAmount] = useState(1);

  const { brandName, industry, keywords } = data;

  const industryOptions = useMemo(
    () =>
      SURVEY_INDUSTRY.map(option => ({
        ...option,
        label: t(option.label),
      })),
    [SURVEY_INDUSTRY, t]
  );

  const currentIndustry = industryOptions.find(item => item.value === (industry || values.industry));
  const currentSlogans = values.slogans?.length ? values.slogans : new Array(slogansAmount).fill('');

  useEffect(() => {
    setValues(prevState => ({
      ...prevState,
      slogans: data.slogans || [],
    }));

    setSlogansAmount(data.slogans?.length || 1);
  }, [data]);

  const fieldOnChange = useCallback(e => {
    const { name, value } = e.target;
    setValues(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const submitOnClick = useCallback(() => {
    postSurveyData(formatPostSurvey({ ...data, ...values }));
    history.push(Routing.WELCOME_AUDIT_PASSED);
  }, [values]);

  const sloganOnChange = (event, index) => {
    const { value } = event.target;
    setValues(prevState => {
      const newSlogans = prevState.slogans ? [...prevState.slogans] : [];
      newSlogans[index] = value;
      return {
        ...prevState,
        slogans: newSlogans,
      };
    });
  };

  const removeSlogan = index => {
    setValues(prevState => {
      const newArray = prevState.slogans ? [...prevState.slogans] : [];
      remove(newArray, (item, ind) => index === ind);
      return {
        ...prevState,
        slogans: newArray,
      };
    });
    setSlogansAmount(slogansAmount - 1);
  };

  const onSelectChange = ({ value }) => {
    setValues(prevState => ({ ...prevState, industry: value }));
  };

  const addSlogan = () => {
    setSlogansAmount(slogansAmount + 1);
    setValues(prevState => ({
      ...prevState,
      slogans: [...prevState.slogans, ''],
    }));
  };

  return (
    <div className="survey">
      <div className="survey__content">
        <CustomInput
          type="text"
          name="brandName"
          label={t('survey:brandName')}
          className="survey__brand-name"
          onChange={fieldOnChange}
          placeholder="MyAwesomeStore"
          value={values.brandName || brandName}
        />
        <div className="survey__slogan-block">
          <h3>{t('survey:typeSlogans')}</h3>
          {currentSlogans.map((item, index) => (
            <div key={`slogan${index}`} className="survey__slogan-row">
              <CustomInput
                type="text"
                label={`Slogan ${index + 1}`}
                name={`slogan${index}`}
                className="survey__slogan"
                value={values.slogans ? values.slogans[index] : ''}
                onChange={e => sloganOnChange(e, index)}
              />
              {slogansAmount > 1 && (
                <button onClick={() => removeSlogan(index)} type="button" className="survey__trash-btn">
                  <img src="/svg/trash-alt.svg" alt="trash-can-svg" />
                </button>
              )}
            </div>
          ))}
        </div>
        {slogansAmount < 5 && (
          <div onClick={() => addSlogan()} className="survey__plus-slogan">
            <span>Add one more</span>
            <img src="/svg/plus.svg" alt="plus-svg" />
          </div>
        )}

        {/* TODO add text-area component */}
        <h3 className="survey__describe-label">{t('survey:typeKeywords')}</h3>
        <CustomInput
          type="text"
          name="keywords"
          className="survey__describe"
          onChange={fieldOnChange}
          value={values.keywords || keywords}
        />

        <h3 className="survey__industry-label">{t('survey:selectIndustry')}</h3>
        <CustomSelect
          options={industryOptions}
          value={currentIndustry || undefined}
          onChange={onSelectChange}
          name="industry"
        />

        <div className="survey__actions">
          <Button key="submit-btn" onClick={submitOnClick} type="button" className="survey__submit-btn">
            {t('survey:action.submit')}
          </Button>
          <Button key="skip-btn" onClick={submitOnClick} type="button" className="survey__skip-btn">
            {t('survey:action.skip')}
          </Button>
        </div>
      </div>
    </div>
  );
};

Survey.propTypes = {
  postSurveyData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default Survey;
