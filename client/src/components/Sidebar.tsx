import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  TeamOutlined,
  SnippetsOutlined,
  FileDoneOutlined,
  LockOutlined
} from '@ant-design/icons'
import authStore from '../store/auth/auth.store'
import isRoleMatch from '../utils/isRoleMatch'
import { Roles } from '../enums/roles.enum'

interface SidebarProps {
  collapsed: boolean
}

interface MenuItem {
  path: string
  label: string
  icon: React.ReactNode
  role?: Roles
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { user } = authStore
  const location = useLocation()

  const menu = useMemo(() => {
    const items: MenuItem[] = [
      {
        path: '/users',
        label: 'Пользователи',
        icon: <TeamOutlined />,
        role: Roles.Admin
      },
      {
        path: '/acts',
        label: 'Акты',
        icon: <SnippetsOutlined />
      },
      {
        path: '/agreements',
        label: 'Соглашения',
        icon: <FileDoneOutlined />
      },
      {
        path: '/skzi-units',
        label: 'СКЗИ',
        icon: <LockOutlined />
      }
    ]

    return items.filter(item => user && (!item.role || isRoleMatch(user.role.role, item.role)))
  }, [user])

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
        {menu.map(item => (
          <Menu.Item key={item.path} icon={item.icon}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  )
}

export default observer(Sidebar)