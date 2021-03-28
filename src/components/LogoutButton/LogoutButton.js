import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';

import './LogoutButton.styles.less';

const LogoutButton = ({ display, userLogout, onLogout }) => {
  const { t } = useTranslation();

  const handleClick = async () => {
    if (onLogout) await onLogout();
    userLogout();
  };

  return (
    <div style={display ? null : { display: 'none' }} className="logout-btn__wrapper">
      <Button onClick={() => handleClick()} className="logout-btn" type="button" title={t('app:logout')} />
    </div>
  );
};

LogoutButton.propTypes = {
  display: PropTypes.bool.isRequired,
  userLogout: PropTypes.func.isRequired,
  onLogout: PropTypes.func,
};

LogoutButton.defaultProps = {
  onLogout: () => undefined,
};

export default LogoutButton;
