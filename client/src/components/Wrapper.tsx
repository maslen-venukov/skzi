import React, { useMemo } from 'react'
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
import { selectAuth } from '../store/auth/auth.slice'
import useBoolean from '../hooks/useBoolean'
import useTypedSelector from '../hooks/useTypedSelector'
import storage from '../utils/storage'
import { Roles } from '../enums/Roles'
import { Page, ChildPage } from '../interfaces/Page'


const Users = React.lazy(() => import('../pages/Users'))
const Acts = React.lazy(() => import('../pages/Acts'))
const Agreements = React.lazy(() => import('../pages/Agreements'))
const SkziUnits = React.lazy(() => import('../pages/SkziUnits'))

const Wrapper = () => {
  const collapsed = useBoolean(storage.get<boolean>('collapsed') || false)
  const { user } = useTypedSelector(selectAuth)

  const onToggle = () => {
    collapsed.toggle()
    storage.set('collapsed', !collapsed.value)
  }

  const pages = useMemo(() => {
    const allPages: Page[] = [
      {
        icon: <TeamOutlined />,
        element: <Users />,
        path: '/users',
        label: 'Пользователи',
        roles: [Roles.System, Roles.Admin]
      },
      {
        icon: <SnippetsOutlined />,
        element: <Acts />,
        path: '/acts',
        label: 'Акты'
      },
      {
        icon: <FileDoneOutlined />,
        element: <Agreements />,
        path: '/agreements',
        label: 'Соглашения'
      },
      {
        icon: <LockOutlined />,
        element: <SkziUnits />,
        path: '/skzi-units',
        label: 'СКЗИ'
      }
    ]

    return allPages.filter(page => user && (!page.roles?.length || page.roles.includes(user.role.role)))
  }, [user])

  const createPage = (page: ChildPage) => (
    <Route
      key={page.path}
      path={page.path}
      element={
        <React.Suspense fallback={<Loader />}>
          {page.element}
        </React.Suspense>
      }
    >
      {page.children && page.children.map(createPage)}
    </Route>
  )

  return (
    <Layout className="wrapper">
      <Sidebar collapsed={collapsed.value} pages={pages} />

      <Layout>
        <Header collapsed={collapsed.value} onToggle={onToggle} />

        <Layout.Content className="content">
          <Routes>
            {pages.map(createPage)}
            <Route path="*" element={<Navigate to={pages[0].path} replace />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Wrapper