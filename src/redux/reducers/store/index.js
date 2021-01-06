import createSagaMiddleware from 'redux-saga'
// import rootSaga from '../sagas'
import configStore from './configStore'
import initialStore from './initialStore'

const sagaMiddleware = createSagaMiddleware();

export const store = configStore(initialStore, sagaMiddleware, process.env.NODE_ENV);

export default store