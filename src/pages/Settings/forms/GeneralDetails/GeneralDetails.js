import React, { useState, useCallback, useEffect } from 'react';
import CustomInput from 'components/CustomInput';
import Button from 'components/Button';
import * as Routing from 'constants/routing';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { formatGeneralDetailsUpdate } from 'formatters/settings';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { emailValidation } from 'helpers/validation/auth';

import './GeneralDetails.styles.less';

const GeneralDetails = ({ data, updateGeneral, updateEmail }) => {
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange', shouldUnregister: true });
  const { t } = useTranslation();
  const history = useHistory();
  const [fields, setFields] = useState({});
  const { firstName = '', lastName = '', email = '', phone = '' } = data;

  useEffect(() => setFields(data), [data]);

  const fieldOnChange = useCallback(e => {
    const { name, value } = e.target;
    setFields(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const handleSubmitRequest = async () => {
    if (fields.email !== data.email) {
      updateEmail(fields.email);
    }
    if (fields.firstName !== data.firstName || fields.lastName !== data.lastName || fields.phone !== data.phone) {
      updateGeneral(formatGeneralDetailsUpdate(fields));
    }
  };

  const handleUndo = () => setFields(data);

  return (
    <form onSubmit={handleSubmit(handleSubmitRequest)} name="signup-form" className="general-details">
      <div className="general-details__row">
        <CustomInput
          name="firstName"
          className="general-details__first-name"
          value={fields.firstName}
          defaultValue={firstName}
          onChange={fieldOnChange}
          label={t('settings:firstName')}
        />
        <CustomInput
          name="lastName"
          className="general-details__last-name"
          value={fields.lastName}
          defaultValue={lastName}
          onChange={fieldOnChange}
          label={t('settings:lastName')}
        />
      </div>
      <div className="general-details__row">
        <CustomInput
          type="email"
          name="email"
          ref={register(emailValidation())}
          className="general-details__email"
          onChange={fieldOnChange}
          value={fields.email}
          defaultValue={email}
          isError={!!errors.email}
          label={t('settings:address')}
        />
        <Button
          onClick={() => history.push(`${Routing.RESET_PASSWORD}?routeBack=${Routing.SETTINGS}`)}
          className="general-details__reset-psw"
        >
          {t(`settings:resetPassword`)}
        </Button>
      </div>
      <div className="general-details__row">
        <CustomInput
          name="phone"
          className="general-details__phone"
          onChange={fieldOnChange}
          value={fields.phone}
          defaultValue={phone}
          label={t('settings:phone')}
        />
      </div>
      <div className="general-details__actions">
        <Button key="generalUndoChanges" onClick={() => handleUndo()} className="general-details__undo-change">
          {t(`settings:undoChanges`)}
        </Button>
        <Button key="generalSaveChanges" type="submit" className="general-details__save-btn">
          {t(`settings:saveChanges`)}
        </Button>
      </div>
    </form>
  );
};

GeneralDetails.propTypes = {
  updateGeneral: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default GeneralDetails;
