import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner';
import classNames from 'classnames';

import './Button.styles.less';

/* eslint-disable react/button-has-type */
const Button = ({ title, onClick, isLoading, loadingPromise, disabled, className, children, type, value }) => {
  const [content, setContent] = useState(isLoading ? <Spinner /> : title);
  const [isDisabled, setIsDisabled] = useState(isLoading);

  useEffect(() => {
    if (loadingPromise) {
      setContent(<Spinner />);
      setIsDisabled(true);

      loadingPromise.finally(() => {
        setIsDisabled(false);
        setContent(title);
      });
    }
  }, [loadingPromise, title]);

  useEffect(() => setIsDisabled(isLoading), [isLoading]);

  useEffect(() => setContent(isLoading ? <Spinner /> : title), [title, isLoading]);

  return (
    <button
      disabled={isDisabled || disabled}
      type={type}
      value={value}
      className={classNames('custom-button', className, { isDisabled: disabled })}
      onClick={onClick}
    >
      {content || children}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.array]),
  isLoading: PropTypes.bool,
  loadingPromise: PropTypes.shape({
    then: PropTypes.func.isRequired,
    catch: PropTypes.func.isRequired,
    finally: PropTypes.func.isRequired,
  }),
  disabled: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};

Button.defaultProps = {
  title: '',
  type: 'button',
  value: '',
  isLoading: false,
  loadingPromise: null,
  disabled: false,
  className: '',
  children: null,
  onClick: () => undefined,
};

export default Button;
