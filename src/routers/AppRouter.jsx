import React, { Suspense } from 'react';
import { renderRoutes } from "react-router-config";
import routes from './routes'

const AppRouter = () => {
  return (
    <Suspense fallback={null}>
      {renderRoutes(routes)}
    </Suspense>
  )
}

export default AppRouter