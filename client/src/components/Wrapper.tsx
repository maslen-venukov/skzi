import React, { Suspense, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from 'antd'
import Sidebar from './Sidebar'
import Header from './Header'
import Loader from './Loader'
import Dialog from './Dialog'
import authStore from '../store/auth/auth.store'
import useBoolean from '../hooks/useBoolean'
import storage from '../utils/storage'
import isRoleMatch from '../utils/isRoleMatch'
import { Roles } from '../store/roles/roles.types'

interface Page {
  path: string
  element: React.ReactNode
  role?: Roles
}

const Users = React.lazy(() => import('../pages/Users'))
const Acts = React.lazy(() => import('../pages/Acts'))
const Agreements = React.lazy(() => import('../pages/Agreements'))
const Agreement = React.lazy(() => import('../pages/Agreement'))
const SkziUnits = React.lazy(() => import('../pages/SkziUnits'))
const AgreementTypes = React.lazy(() => import('../pages/AgreementTypes'))
const SkziTypes = React.lazy(() => import('../pages/SkziTypes'))
const PlatformTypes = React.lazy(() => import('../pages/PlatformTypes'))
const SignTypes = React.lazy(() => import('../pages/SignTypes'))
const VipnetLans = React.lazy(() => import('../pages/VipnetLans'))

const Wrapper = () => {
  const { user } = authStore
  const collapsed = useBoolean(storage.get<boolean>('collapsed') || false)

  const onToggle = () => {
    collapsed.toggle()
    storage.set('collapsed', !collapsed.value)
  }

  const pages = useMemo(() => {
    const allPages: Page[] = [
      {
        path: '/users',
        element: <Users />,
        role: Roles.Admin
      },
      {
        path: '/acts',
        element: <Acts />
      },
      {
        path: '/agreements',
        element: <Agreements />
      },
      {
        path: '/agreements/:id',
        element: <Agreement />
      },
      {
        path: '/skzi-units',
        element: <SkziUnits />
      },
      {
        path: '/agreement-types',
        element: <AgreementTypes />
      },
      {
        path: '/skzi-types',
        element: <SkziTypes />
      },
      {
        path: '/platform-types',
        element: <PlatformTypes />
      },
      {
        path: '/sign-types',
        element: <SignTypes />
      },
      {
        path: '/vipnet-lans',
        element: <VipnetLans />
      }
    ]

    return allPages.filter(page => user && (!page.role || isRoleMatch(user.role.role, page.role)))
  }, [user])

  return (
    <Layout className="wrapper">
      <Sidebar collapsed={collapsed.value} />

      <Layout>
        <Header collapsed={collapsed.value} onToggle={onToggle} />

        <Layout.Content className="content">
          <Routes>
            {pages.map(page => (
              <Route
                key={page.path}
                path={page.path}
                element={
                  <Suspense fallback={<Loader />}>
                    {page.element}
                  </Suspense>
                }
              />
            ))}
            <Route path="*" element={<Navigate to={pages[0].path} replace />} />
          </Routes>
        </Layout.Content>
      </Layout>

      <Dialog />
    </Layout>
  )
}

export default observer(Wrapper)