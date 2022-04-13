import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  TeamOutlined,
  WalletOutlined,
  SnippetsOutlined,
  FileDoneOutlined,
  LockOutlined,
  BookOutlined
} from '@ant-design/icons'
import authStore from '../store/auth/auth.store'
import isRoleMatch from '../utils/isRoleMatch'
import { Roles } from '../store/roles/roles.types'


interface Reference {
  path: string
  label: string
}

interface MenuItem extends Reference {
  icon: React.ReactNode
  role?: Roles
}

interface SidebarProps {
  collapsed: boolean
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
        path: '/orgs',
        label: 'Контрагенты',
        icon: <WalletOutlined />
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

  const references: Reference[] = [
    {
      path: '/agreement-types',
      label: 'Типы соглашений'
    },
    {
      path: '/skzi-types',
      label: 'Типы СКЗИ'
    },
    {
      path: '/platform-types',
      label: 'Типы платформ'
    },
    {
      path: '/sign-types',
      label: 'Типы подписей'
    },
    {
      path: '/vipnet-lans',
      label: 'Сети ViPNet'
    }
  ]

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
        {menu.map(item => (
          <Menu.Item key={item.path} icon={item.icon}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}

        <Menu.SubMenu
          key="references"
          title="Справочники"
          icon={<BookOutlined />}
        >
          {references.map(reference => (
            <Menu.Item key={reference.path}>
              <Link to={reference.path}>{reference.label}</Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      </Menu>
    </Layout.Sider>
  )
}

export default observer(Sidebar)