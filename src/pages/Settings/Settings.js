import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import SemiHeader from 'components/SemiHeader';
import GeneralDetails from 'pages/Settings/forms/GeneralDetails';
import StoreDetails from 'pages/Settings/forms/StoreDetails';
import { useTranslation } from 'react-i18next';

import CustomBlock from './CustomBlock';
import TeamForm from './forms/TeamForm';
import NotificationForm from './forms/NotificationForm';
import ConnectionsForm from './forms/ConnectionsForm';

import './Settings.styles.less';

const Settings = props => {
  const { t } = useTranslation();
  const {
    connectedConnections,
    generalData,
    updateGeneralDetails,
    updateEmailOnly,
    updateConnection,
    deleteConnection,
    getConnections,
    storeDetails,
    updateTeam,
    team,
    notifications,
    updateNotifications,
    updateStoreDetails,
  } = props;

  return (
    <div className="settings-pg">
      <SemiHeader className="settings-pg__semi-header" label={t('settings:Settings')} brand="Clothing Brand X" />
      <div className="settings-pg__content">
        <div className="settings-pg__sets-column">
          <CustomBlock className="settings-pg__general-block" label="General Details">
            <GeneralDetails data={generalData} updateGeneral={updateGeneralDetails} updateEmail={updateEmailOnly} />
          </CustomBlock>
          <CustomBlock className="settings-pg__store-block" label="Store Details">
            <StoreDetails data={storeDetails} updateStoreDetails={updateStoreDetails} />
          </CustomBlock>

          <CustomBlock className="settings-pg__team-block" label="Team">
            <TeamForm data={team} updateTeam={updateTeam} />
          </CustomBlock>

          <CustomBlock className="settings-pg__connect-block" label="Connections">
            <ConnectionsForm
              connections={connectedConnections}
              updateConnection={updateConnection}
              deleteConnection={deleteConnection}
              getConnections={getConnections}
            />
          </CustomBlock>

          <CustomBlock className="settings-pg__note-block" label="Notifications">
            <NotificationForm data={notifications} updateNotifications={updateNotifications} />
          </CustomBlock>
        </div>

        <div className="settings-pg__tips-column">
          <div className="settings-pg__tip-block">
            <div>
              <img src="/svg/lightbulb.svg" alt="lightbulb svg" />
              <h3>ProTip!</h3>
            </div>
            <p className="settings-pg__many-stores">{t('settings:manyStores')}</p>
            <Button className="settings-pg__learn-more">
              {['Learn more', <img key="arrow icon" src="/svg/arrow.svg" alt="arrow svg" />]}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  updateTeam: PropTypes.func.isRequired,
  storeDetails: PropTypes.object.isRequired,
  generalData: PropTypes.object.isRequired,
  updateGeneralDetails: PropTypes.func.isRequired,
  updateEmailOnly: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
  updateNotifications: PropTypes.func.isRequired,
  connectedConnections: PropTypes.array.isRequired,
  getConnections: PropTypes.func.isRequired,
  updateConnection: PropTypes.func.isRequired,
  deleteConnection: PropTypes.func.isRequired,
  team: PropTypes.array.isRequired,
  updateStoreDetails: PropTypes.func.isRequired,
};

Settings.defaultProps = {};

export default Settings;
