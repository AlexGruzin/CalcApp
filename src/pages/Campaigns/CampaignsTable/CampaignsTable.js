import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { COLUMNS, TABLE_HEIGHT } from 'constants/campaignsTable';

const CampaignsTable = ({ allCampaigns }) => (
  <DataTable
    columns={COLUMNS}
    data={allCampaigns}
    striped
    noHeader
    className="campaingsTable"
    fixedHeaderScrollHeight={TABLE_HEIGHT}
  />
);

CampaignsTable.propTypes = {
  allCampaigns: PropTypes.array.isRequired,
};

CampaignsTable.defaultProps = {};

export default CampaignsTable;
