import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './CustomBlock.styles.less';

const CustomBlock = ({ header, label, content, footer, className, children }) => {
  const bodyData = content || children;

  return (
    <div key={label} className={classNames('custom-block', className)}>
      {label && (
        <div className="custom-block__header">
          <h2>{label}</h2>
        </div>
      )}
      {header && <div className="custom-block__header">{header}</div>}
      <div className="custom-block__body">{bodyData}</div>
      <div className="custom-block__footer">{footer}</div>
    </div>
  );
};

CustomBlock.propTypes = {
  className: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.array]),
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.array]),
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.array]),
  label: PropTypes.string.isRequired,
};

CustomBlock.defaultProps = {
  className: '',
  header: null,
  content: null,
  footer: null,
  children: null,
};

export default CustomBlock;
