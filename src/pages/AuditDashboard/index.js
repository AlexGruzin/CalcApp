import { connect } from 'react-redux';
import AuditDashboard from './AuditDashboard';
import selector from './selector';

export default connect(selector, null)(AuditDashboard);
