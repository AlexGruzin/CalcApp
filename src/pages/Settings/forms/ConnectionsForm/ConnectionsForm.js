import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getFormattedDateItem } from 'formatters/date';
import EditModal from 'pages/Settings/EditComponents/EditModal';
import { ADVERT } from 'constants/advertisment';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import './ConnectionsForm.styles.less';

const ConnectionsForm = ({ connections, updateConnection, deleteConnection, getConnections }) => {
  const history = useHistory();
  const [isModal, setModal] = useState(false);
  const [currentConnection, setCurrentConnection] = useState('');

  const toggleEditModal = () => {
    setModal(prevState => !prevState);
  };

  const submitEditData = data => {
    toggleEditModal();
    updateConnection({ ...data, type: currentConnection });
  };

  const editIconClick = connection => {
    const { type } = connection;
    setCurrentConnection(type);

    switch (type) {
      // here is connections that require edit forms
      case ADVERT.SHOPIFY: {
        toggleEditModal();
        break;
      }
      default: {
        updateConnection(connection);
      }
    }
  };

  const handleStorageUpdate = event => {
    const { key, newValue } = event;

    if (!key || !newValue) return;
    if (key === 'recentlyConnected') {
      // TODO styled success / error state
      getConnections();
      localStorage.setItem('recentlyConnected', '');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageUpdate);
    }
  }, []);

  const connectionsBlock = useMemo(() => {
    if (!connections.length) return null;

    return connections.map(connection => (
      <div key={`${connection.type}${connection.date}`} className="connections_block__item">
        <div className="connections__item-text">
          <div>
            <img className="connections_block__logo" src={`/images/${connection.image}`} alt={connection.image} />
          </div>
          <h6>{`Data received: ${getFormattedDateItem(connection.date)}`}</h6>
        </div>
        <div className="connections__item-icons">
          {/* <button type="button" onClick={() => deleteConnection(connection)}> */}
          {/*  <img src="/svg/trash-alt.svg" alt="trash-can-svg" /> */}
          {/* </button> */}
          {!(connection.type === ADVERT.SHOPIFY) && (
            <button type="button" onClick={() => editIconClick(connection)}>
              <img src="/svg/edit.svg" alt="edit-svg" />
            </button>
          )}
        </div>
      </div>
    ));
  }, [connections]);

  return (
    <>
      <div className="settings-pg__connect-content">
        {connectionsBlock}
        <div
          onClick={() => undefined}
          className={classNames('connections_block__item', 'connections_block__plus-item')}
        >
          <p>Add Connection</p>
          <img src="/svg/plus.svg" alt="trash-can-svg" />
        </div>
      </div>
      <EditModal isOpen={isModal} closeModal={toggleEditModal} submit={submitEditData} />
    </>
  );
};

ConnectionsForm.propTypes = {
  connections: PropTypes.array,
  updateConnection: PropTypes.func.isRequired,
  getConnections: PropTypes.func.isRequired,
  deleteConnection: PropTypes.func.isRequired,
};

ConnectionsForm.defaultProps = {
  connections: PropTypes.array,
};

export default ConnectionsForm;
