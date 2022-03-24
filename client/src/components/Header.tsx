import React from 'react'
import { Layout, Button } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
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

      <Button
        type="primary"
        danger
        onClick={onLogout}
      >Выйти</Button>
    </Layout.Header>
  )
}

export default Header