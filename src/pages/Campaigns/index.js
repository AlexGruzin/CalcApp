import { connect } from 'react-redux';
import { getAllCampaigns } from 'domains/campaigns/actions';
import Campaigns from './Campaigns';
import selector from './selectors';

const mapDispatchToProps = {
  getAllCampaigns,
};

export default connect(selector, mapDispatchToProps)(Campaigns);
