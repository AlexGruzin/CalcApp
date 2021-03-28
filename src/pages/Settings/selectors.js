import { createStructuredSelector, createSelector } from 'reselect';
import { connectionsObject as allPossibleConnections } from 'constants/settings';
import { flow } from 'lodash';

import { getConnectionsData } from 'domains/connections/selectors';
import { getUserSettings } from 'domains/auth/selectors';

const connectionsFormatted = createSelector([getConnectionsData], connections =>
  connections.map(item => {
    const { type, date } = item;
    const data = allPossibleConnections[type];
    return { ...data, date };
  })
);

const storeDetails = flow([getUserSettings], settings => settings.storeDetails || {});

const generalData = flow([getUserSettings], settings => settings.generalDetails || {});

const team = flow([getUserSettings], settings => settings.team || []);

const notifications = flow([getUserSettings], settings => settings.notifications || {});

export default createStructuredSelector({
  connectedConnections: connectionsFormatted,
  storeDetails,
  generalData,
  team,
  notifications,
});
