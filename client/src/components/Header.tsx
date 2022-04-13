import React from 'react'
import { observer } from 'mobx-react-lite'
import { Layout, Typography } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import Hint from './Hint'
import authStore from '../store/auth/auth.store'

interface HeaderProps {
  collapsed: boolean
  onToggle: () => void
}

const Header: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  const { user, logout } = authStore

  return (
    <Layout.Header className="header">
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'header__collapse',
        onClick: onToggle
      })}

      <Typography.Text>
        {user?.realName} - {user?.name}
      </Typography.Text>

      <Hint
        tooltipProps={{
          title: 'Выйти',
          placement: 'left'
        }}
        buttonProps={{
          type: 'primary',
          icon: <LogoutOutlined />,
          danger: true,
          onClick: logout
        }}
      />
    </Layout.Header>
  )
}

export default observer(Header)