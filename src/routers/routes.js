import { lazy } from 'react';

const mainRoutes = [
  {
    key: 'index',
    name: '首页',
    path: '/',
    exact: true,
    component: lazy(() => import(/* webpackChunkName: "index" */ '@/pages/index'))
  }
]

export default mainRoutes