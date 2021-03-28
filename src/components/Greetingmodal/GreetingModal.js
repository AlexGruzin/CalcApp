import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import './GreetingModal.styles.less';

const GreetingModal = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames('greet-ml', className)}>
      <h1 className="greet-ml__hey">Hey There</h1>
      <p className="greet-ml__description">Welcome to the club!</p>
      <Button className="greet-ml__tour" onClick={() => {}}>
        {t('Take a site tour')}
      </Button>
      <Button className="greet-ml__store" onClick={() => {}}>
        {t('Take Store Survey')}
      </Button>
    </div>
  );
};

GreetingModal.propTypes = {
  className: PropTypes.string,
};

GreetingModal.defaultProps = {
  className: '',
};

export default GreetingModal;
