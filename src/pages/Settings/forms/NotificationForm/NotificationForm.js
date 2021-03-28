import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatNotificationsUpdate } from 'formatters/settings';
import Toggle from 'components/Toggle';
import Button from 'components/Button';

import './NotificationForm.styles.less';

const NotificationForm = ({ data, updateNotifications }) => {
  const { t } = useTranslation();
  const [fields, setFields] = useState({});
  const isMounted = useRef(false);
  const { campaignStarted, campaignEnded, infoNeed, newConnect, lostConnect, revenueSpent, amountSpent, roas } = fields;

  useEffect(() => setFields(data), [data]);

  const fieldOnChange = useCallback(e => {
    const { name, checked } = e.target;
    setFields(prevState => ({ ...prevState, [name]: checked }));
  }, []);

  const handleSubmit = async () => {
    await updateNotifications(formatNotificationsUpdate({ ...data, ...fields }));
  };

  const handleUndo = () => setFields({ ...data });

  useEffect(() => {
    if (isMounted.current) isMounted.current = true;
  });

  return (
    <form className="note-form__note-content">
      <div className="note-form__sets">
        <div className="note-form__note-column">
          <h3>Campaigns</h3>
          <Toggle
            name="campaignStarted"
            label={t('settings:noteForm.campaignStarted')}
            checked={campaignStarted}
            onChange={fieldOnChange}
          />
          <Toggle
            name="campaignEnded"
            label={t('settings:noteForm.campaignEnded')}
            checked={campaignEnded}
            onChange={fieldOnChange}
          />
          <Toggle name="infoNeed" checked={infoNeed} label={t('settings:noteForm.infoNeed')} onChange={fieldOnChange} />

          <h3>Connections</h3>
          <Toggle
            name="newConnect"
            label={t('settings:noteForm.newConnect')}
            checked={newConnect}
            onChange={fieldOnChange}
          />
          <Toggle
            name="lostConnect"
            label={t('settings:noteForm.lostConnect')}
            checked={lostConnect}
            onChange={fieldOnChange}
          />
        </div>
        <div className="note-form__note-column">
          <h3>Spend</h3>
          <Toggle
            name="revenueSpent"
            label={t('settings:noteForm.revenueSpent')}
            checked={revenueSpent}
            onChange={fieldOnChange}
          />
          <Toggle
            name="amountSpent"
            label={t('settings:noteForm.amountSpent')}
            checked={amountSpent}
            onChange={fieldOnChange}
          />
          <Toggle name="roas" label={t('settings:noteForm.roas')} checked={roas} onChange={fieldOnChange} />
        </div>
      </div>
      <div className="note-form__buttons">
        <Button onClick={handleUndo} className="settings-pg__undo-change">
          {t(`settings:undoChanges`)}
        </Button>
        <Button onClick={handleSubmit} className="settings-pg__general-save-btn">
          {t(`settings:saveChanges`)}
        </Button>
      </div>
    </form>
  );
};

NotificationForm.propTypes = {
  data: PropTypes.object.isRequired,
  updateNotifications: PropTypes.func.isRequired,
};

export default NotificationForm;
