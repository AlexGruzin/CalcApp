import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from 'components/Button';

import './WarningBlock.styles.less';

const WarningBlock = ({ text, buttonText, route, textBeforeButton }) => {
  const history = useHistory();

  return (
    <div className="warning-block">
      <div className="warning-block__info">
        <img className="warning-block__info-svg" src="/svg/warning.svg" alt="info-svg" />
        {text}
      </div>
      <div className="warning-block__btn">
        {textBeforeButton}
        {buttonText && (
          <Button className="custom-button_blue" onClick={() => history.push(route)}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

WarningBlock.propTypes = {
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  route: PropTypes.string,
  textBeforeButton: PropTypes.string,
};

WarningBlock.defaultProps = {
  buttonText: '',
  route: '',
  textBeforeButton: '',
};

export default WarningBlock;
