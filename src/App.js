import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title';
import { ConfigProvider } from 'antd';
import store from '@/redux/store/index';
import AppRouter from '@/routers/AppRouter';
import moment from 'moment';
import 'moment/locale/zh-cn'
import zhCN from 'antd/es/locale/zh_CN'
import './App.less';


const App = () => {
  moment.locale('zh-cn')
  return (
    <DocumentTitle>
      <Provider store={store}>
        <BrowserRouter>
          <ConfigProvider locale={zhCN}>
            <AppRouter />
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </DocumentTitle>
  )
}

export default App;