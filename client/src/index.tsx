import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import locale from 'antd/lib/locale/ru_RU'
import 'moment/locale/ru'
import Loader from './components/Loader'
import './styles/index.sass'

const App = React.lazy(() => import('./App'))

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ConfigProvider locale={locale} componentSize="small">
        <React.Suspense fallback={<Loader />}>
          <App />
        </React.Suspense>
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)