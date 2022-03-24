import React, { useState, useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from 'antd'
import {
  TeamOutlined,
  SnippetsOutlined,
  FileDoneOutlined,
  LockOutlined
} from '@ant-design/icons'
import Sidebar from './Sidebar'
import Header from './Header'
import Loader from './Loader'
import useTypedSelector from '../hooks/useTypedSelector'
import { selectAuth } from '../store/auth/auth.slice'
import { Roles } from '../enums/Roles'
import storage from '../utils/storage'

export interface Page {
  path: string
  label: string
  element: React.ReactNode
  icon: React.ReactNode
  roles: Roles[]
}

const Users = React.lazy(() => import('../pages/Users'))
const Acts = React.lazy(() => import('../pages/Acts'))
const Agreements = React.lazy(() => import('../pages/Agreements'))
const SkziUnits = React.lazy(() => import('../pages/SkziUnits'))

const Wrapper = () => {
  const [collapsed, setCollapsed] = useState(storage.get<boolean>('collapsed') || false)
  const { user } = useTypedSelector(selectAuth)

  const onToggle = () => {
    setCollapsed(!collapsed)
    storage.set('collapsed', !collapsed)
  }

  const pages: Page[] = useMemo(() => (
    [
      { icon: <TeamOutlined />, element: <Users />, path: '/users', label: 'Пользователи', roles: [Roles.Admin] },
      { icon: <SnippetsOutlined />, element: <Acts />, path: '/acts', label: 'Акты', roles: [] },
      { icon: <FileDoneOutlined />, element: <Agreements />, path: '/agreements', label: 'Соглашения', roles: [] },
      { icon: <LockOutlined />, element: <SkziUnits />, path: '/skzi-units', label: 'СКЗИ', roles: [] }
    ].filter(page => user && (!page.roles.length || page.roles.includes(user.role.role)))
  ), [user])

  // TODO сделать дочерние роуты

  return (
    <Layout className="wrapper">
      <Sidebar collapsed={collapsed} pages={pages} />

      <Layout>
        <Header collapsed={collapsed} onToggle={onToggle} />

        <Layout.Content className="content">
          <Routes>
            {pages.map(page => (
              <Route
                key={page.path}
                path={page.path}
                element={
                  <React.Suspense fallback={<Loader />}>
                    {page.element}
                  </React.Suspense>
                }
              />
            ))}
            <Route path="*" element={<Navigate to={pages[0].path} replace />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Wrapper