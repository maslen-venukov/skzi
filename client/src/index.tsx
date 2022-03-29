import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import locale from 'antd/lib/locale/ru_RU'
import 'moment/locale/ru'
import Loader from './components/Loader'
import store from './store'
import './styles/index.sass'

const App = React.lazy(() => import('./App'))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={locale} componentSize="middle">
        <Router>
          <React.Suspense fallback={<Loader />}>
            <App />
          </React.Suspense>
        </Router>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)