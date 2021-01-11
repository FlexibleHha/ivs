import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BasicLayout from '@/layouts/basicLayout.jsx';
import LoginLayout from '@/layouts/loginLayout.jsx';
import routes from './routes';

const AppRouter = (routeProps) => {
  const renderRoute = (routes) => {
    return (
      <Suspense fallback={null}>
        <Switch>
          {
            routes.map((route, i) => (
              <Route
                path={route.path}
                exact={route.exact}
                key={route.key}
                component={route.component}
              />
            ))
          }
        </Switch>
      </Suspense>
    )
  }
  return (
    <Router>
      <Switch>
        <Route path="/login" render={() => (
          <LoginLayout
            {...routeProps}
            renderRoute={() => renderRoute(routes.loginRoutes)}
          />)} />
        <Route
          path="/"
          render={() => (
            <BasicLayout
              {...routeProps}
              renderRoute={() => renderRoute(routes.mainRoutes)}
            />)}
        />
      </Switch>
    </Router>
  )
}

export default AppRouter