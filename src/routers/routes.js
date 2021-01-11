import { lazy } from 'react';

const loginRoutes = [
  {
    key: 'login',
    name: '登录',
    path: '/login',
    exact: true,
    component: lazy(() => import(/* webpackChunkName: "index" */ '@/pages/login'))
  }
]

const mainRoutes = [
  {
    key: 'index',
    name: '首页',
    path: '/',
    exact: true,
    component: lazy(() => import(/* webpackChunkName: "index" */ '@/pages/index'))
  }
]

export default {
  loginRoutes,
  mainRoutes
}