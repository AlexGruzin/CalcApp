import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Slide.styles.less';

const Slide = ({ className, image, title, description }) => (
  <div className={classNames(className, 'slide')}>
    {image && (
      <div
        className="slide__image"
        style={{
          backgroundImage: `url('/images/${image}')`,
        }}
      />
    )}
    <h4 className="slide__title">{title}</h4>
    <p className="slide__description">{description}</p>
  </div>
);

Slide.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

Slide.defaultProps = {
  className: '',
  image: '',
  title: '',
  description: '',
};

export default Slide;
