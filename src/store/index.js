import { createStore, applyMiddleware, compose } from 'redux';
import { createMiddleware } from 'redux-api-middleware';
import reduxMiddleware from 'react-block-ui/reduxMiddleware';

// router
import { routerMiddleware } from 'connected-react-router';

// middlewares
import createSagaMiddleware from 'redux-saga';

// helpers
import rootReducer from 'reducers';
import rootSaga from 'sagas';
import history from './history';

const initialState = {};

const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
const apiMiddleware = createMiddleware();
const middleware = [routerMiddleware(history), apiMiddleware, reduxMiddleware, sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer(history), initialState, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
