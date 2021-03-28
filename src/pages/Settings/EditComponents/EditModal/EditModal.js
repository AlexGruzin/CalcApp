import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import CustomInput from 'components/CustomInput';
import ReactModal from 'react-modal';
import { useTranslation } from 'react-i18next';

import './EditModal.styles.less';

const EditModal = ({ isOpen, closeModal, submit }) => {
  const { t } = useTranslation();
  const [editData, setEditData] = useState({});

  const onFieldChange = e => {
    const { name, value } = e.target;
    setEditData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        shouldFocusAfterRender={false}
        className="edit-modal"
        overlayClassName="edit-modal__overlay"
        onRequestClose={() => closeModal()}
        shouldReturnFocusAfterClose={false}
        appElement={document.getElementById('builder-pg')}
      >
        <CustomInput
          className="edit-modal__input"
          type="text"
          onChange={e => onFieldChange(e)}
          label="Enter new store name"
          name="storeName"
        />
        <Button onClick={() => submit(editData)} className="edit-modal__submit">
          {t('builder:Submit')}
        </Button>
      </ReactModal>
    </>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default EditModal;
