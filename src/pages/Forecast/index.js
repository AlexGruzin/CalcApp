import { forecastPrediction } from 'domains/campaigns/actions';
import { connect } from 'react-redux';
import Forecast from './Forecast';

export default connect(null, { forecastPrediction })(Forecast);
