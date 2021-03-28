import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CustomSelect from 'components/CustomSelect';
import { MARKETING_CALENDAR_OPTIONS, TIMEZONE_OPTIONS } from 'constants/settings';
import Button from 'components/Button';
import { formatStoreDetailsUpdate } from 'formatters/settings';
import CalendarInput from 'components/CalendarInput';

import './StoreDetails.styles.less';

const StoreDetails = props => {
  const { t } = useTranslation();
  const { data, updateStoreDetails } = props;
  const [tempData, setTempData] = useState({});

  const {
    storeName,
    storeUrl,
    storeEmail,
    storePhone,
    storeCountry,
    storeActiveSince,
    timezone,
    marketingCalendar,
    fiscalYear,
  } = data;

  const translatedMCOptions = useMemo(
    () =>
      MARKETING_CALENDAR_OPTIONS.map(option => ({
        ...option,
        label: t(option.label),
      })),
    [MARKETING_CALENDAR_OPTIONS, t]
  );

  const translatedTimezoneOptions = useMemo(
    () =>
      TIMEZONE_OPTIONS.map(option => ({
        ...option,
        label: t(option.label),
      })),
    [TIMEZONE_OPTIONS, t]
  );

  useEffect(() => {
    setTempData({ timezone, marketingCalendar, fiscalYear });
  }, [data]);

  const currentTimezone = translatedTimezoneOptions.find(item => item.value === tempData.timezone);
  const currentMarketingCalendar = translatedMCOptions.find(item => item.value === tempData.marketingCalendar);

  const onChangeMarketingCalendar = ({ value }) => {
    setTempData(prevState => ({ ...prevState, marketingCalendar: value }));
  };

  const onChangeTimeZone = ({ value }) => {
    setTempData(prevState => ({ ...prevState, timezone: value }));
  };

  const onChangeCalendar = ({ start }) => {
    setTempData(prevState => ({ ...prevState, fiscalYear: start }));
  };

  const handleSaveChanges = useCallback(() => {
    updateStoreDetails(formatStoreDetailsUpdate(tempData));
  }, [tempData]);

  const handleUndoChanges = useCallback(() => {
    setTempData({ timezone, marketingCalendar, fiscalYear });
  }, [data]);

  return (
    <div className="str-details">
      <div className="str-details__row">
        <div className="str-details__info">
          <h4>{storeName}</h4>
          <p className="str-details__email">{storeEmail}</p>
          <h4>Active Since</h4>
          <p>{storeActiveSince}</p>
          <h4>Store Info</h4>
          <p className="str-details__email">{storeUrl}</p>
          <p>{storePhone}</p>
          <p>{storeCountry}</p>
        </div>

        <div className="str-details__store-sets">
          <CustomSelect
            options={translatedMCOptions}
            value={currentMarketingCalendar || translatedMCOptions[0]}
            onChange={onChangeMarketingCalendar}
            label={t('settings:storeDetails.marketCalendar')}
          />
          <CalendarInput
            start={tempData.fiscalYear || fiscalYear}
            onChange={onChangeCalendar}
            label={'Fiscal Year Begins On'}
          />
          <CustomSelect
            options={translatedTimezoneOptions}
            value={currentTimezone || translatedTimezoneOptions[2]}
            onChange={onChangeTimeZone}
            label={'Timezone'}
          />
        </div>
      </div>
      <div className="str-details__actions">
        <Button key="StoreUndoChanges" onClick={handleUndoChanges} className="str-details__undo-change">
          {t(`settings:undoChanges`)}
        </Button>
        <Button key="StoreSaveChanges" onClick={handleSaveChanges} className="str-details__general-save-btn">
          {t(`settings:saveChanges`)}
        </Button>
      </div>
    </div>
  );
};

StoreDetails.propTypes = {
  data: PropTypes.object.isRequired,
  updateStoreDetails: PropTypes.func.isRequired,
};

export default StoreDetails;
