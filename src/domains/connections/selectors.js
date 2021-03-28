import { createSelector } from 'reselect';

export const getConnections = state => state.connections || {};

export const getConnectionsData = createSelector(getConnections, connections => connections.data || []);

export const getIntegrationStatus = createSelector(getConnections, connections => connections.integrationStatus || '');
