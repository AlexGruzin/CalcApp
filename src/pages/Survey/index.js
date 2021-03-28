import { connect } from 'react-redux';
import { postSurveyData } from 'sagas/actions/survey';
import { createStructuredSelector } from 'reselect';
import { userSurveySelector } from 'domains/auth/selectors';

import Survey from './Survey';

export default connect(createStructuredSelector({ data: userSurveySelector }), { postSurveyData })(Survey);
