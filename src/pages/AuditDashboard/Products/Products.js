import React from 'react';
// import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { PRODUCTS_ITEMS } from 'constants/auditDashboard';

const ProductsComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="content-block">
      <h5 className="content-block__title">{t('auditDashboard:products.title')}</h5>
      {PRODUCTS_ITEMS.map((item, index) => (
        <div className={`content-block__info-block ${item.position}`} key={`${item.text}${index}`}>
          <img src={item.img} alt={item.img} />
          <p className="content-block__info-block-text">
            <span>{item.contentPurple} </span>
            {item.content}
          </p>
        </div>
      ))}
      <div className="content-block__footer">
        {t('auditDashboard:seeMore')}
        <img src="/svg/arrow-black.svg" alt="next" />
      </div>
    </div>
  );
};

ProductsComponent.propTypes = {};

ProductsComponent.defaultProps = {};

export default ProductsComponent;
