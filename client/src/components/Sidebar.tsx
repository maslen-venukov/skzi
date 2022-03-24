import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { Page } from './Wrapper'

interface SidebarProps {
  collapsed: boolean
  pages: Page[]
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, pages }) => {
  const location = useLocation()

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
        {pages.map(page => (
          <Menu.Item key={page.path} icon={page.icon}>
            <Link to={page.path}>{page.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  )
}

export default Sidebar