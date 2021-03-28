import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import CustomInput from 'components/CustomInput';
import ArrowProgressBar from 'components/ArrowProgressBar';
import ReactModal from 'react-modal';
import classNames from 'classnames';

const ConnectionFisrtStep = ({ initShopifyIntegration, step, goNextView }) => {
  const { t } = useTranslation();
  const [storeName, setStoreName] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [accessToken, setAccessToken] = useState(false);

  const handleShopifySubmit = () => {
    setIsModal(false);
    const storeNameCleaned = storeName.replace(/\s/g, '-');
    initShopifyIntegration({ storeName: storeNameCleaned, accessToken });
  };

  return (
    <>
      <div className="audit__arrows">
        <ArrowProgressBar activeIndex={0} />
      </div>
      <h2 className="audit__list-label">
        {t('audit:storeCatalogue')} <span>({t('audit:required')})</span>
      </h2>
      <div className="block-list">
        <div onClick={() => setIsModal(true)} className="block-list__item">
          <div className={classNames('block-list__indicator', { isActive: !!step })}>{t('audit:connected')}</div>
          <div>
            <img className="block-list__item-inner" src="/images/shopify-logo.png" alt="Shopify logo" />
          </div>
        </div>
      </div>
      <div className="audit__button">
        <Button onClick={goNextView} className={classNames('audit__lets-go', { isDisabled: !step })}>
          {t(`audit:next`)}
        </Button>
      </div>
      <ReactModal
        isOpen={isModal}
        shouldFocusAfterRender={false}
        className="audit__modal"
        overlayClassName="audit__modal-overlay"
        onRequestClose={() => setIsModal(false)}
        shouldReturnFocusAfterClose={false}
        appElement={document.getElementById('audit')}
      >
        <CustomInput type="text" onChange={e => setStoreName(e.target.value)} label="Enter store name" name="store" />
        <CustomInput
          label="Custom token for development (Optional)"
          onChange={e => setAccessToken(e.target.value)}
          type="accessToken"
          name="accessToken"
          className="confirm-psw__token"
        />
        <Button onClick={handleShopifySubmit} className="audit__modal-submit">
          {t('audit:Submit')}
        </Button>
      </ReactModal>
    </>
  );
};

ConnectionFisrtStep.propTypes = {
  step: PropTypes.string,
  initShopifyIntegration: PropTypes.func.isRequired,
  goNextView: PropTypes.func.isRequired,
};

ConnectionFisrtStep.defaultProps = {
  step: '',
};

export default ConnectionFisrtStep;
