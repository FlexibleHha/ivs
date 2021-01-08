import React, { Suspense } from 'react';
// import { renderRoutes } from 'react-router-config';
import { Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import BasicLayout from '@/layouts/basicLayout.jsx';
import LoginLayout from '@/layouts/loginLayout.jsx';
// import routes from './routes';

const AppRouter = (routeProps) => {

  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route path="/login" render={() => <LoginLayout {...routeProps} />} />
          <Route
            path="/"
            render={() => <BasicLayout {...routeProps} />}
          />
        </Switch>
      </Router>
    </Suspense>
  )
}

export default AppRouter