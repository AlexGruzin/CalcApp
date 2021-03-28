import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import classNames from 'classnames';
import SwipeableSlider from 'components/SwipeableSlider';
import { SLIDES_DATA } from 'constants/auth';
import { useTranslation } from 'react-i18next';
import Form from './form/SignUp';

import './SignUp.styles.less';

const SignUp = ({ postSignUp }) => {
  const { t } = useTranslation();

  return (
    <div className="auth-page">
      <img className="auth-page__logo" src="/svg/logo.svg" alt="Calc logo" />
      <div className="auth-page__content">
        <div className={classNames('auth-page__form-block')}>
          <Form handleSubmit={postSignUp} />
        </div>

        <div className="auth-page__data-block">
          <SwipeableSlider className="auth-page__slider" autoPlay={false} slides={SLIDES_DATA} />
          <Button className="auth-page__learn-btn" onClick={() => undefined}>
            {t('auth:learnMore')}
          </Button>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  postSignUp: PropTypes.func.isRequired,
};

export default SignUp;
