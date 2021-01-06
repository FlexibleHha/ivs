import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = (preloadedState, sagaMiddleware, env = null) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(['production'].indexOf(env) > -1
      ? applyMiddleware(sagaMiddleware)
      : applyMiddleware(sagaMiddleware, createLogger())
    )
  )

  return store
}

export default configureStore