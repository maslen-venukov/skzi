import React from 'react'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons'
import Hint from './Hint'
import { logout } from '../store/auth/auth.slice'
import useTypedDispatch from '../hooks/useTypedDispatch'

interface HeaderProps {
  collapsed: boolean
  onToggle: () => void
}

const Header: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  const dispatch = useTypedDispatch()

  const onLogout = () => dispatch(logout())

  return (
    <Layout.Header className="header">
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'header__collapse',
        onClick: onToggle
      })}

      <Hint
        tooltipProps={{
          title: 'Выйти',
          placement: 'left'
        }}
        buttonProps={{
          type: 'primary',
          icon: <LogoutOutlined />,
          danger: true,
          onClick: onLogout
        }}
      />
    </Layout.Header>
  )
}

export default Header