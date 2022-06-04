import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Layout, Menu, Space, Typography } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import TypedDropdown from './TypedDropdown'
import Hint from './Hint'
import authStore from '../store/auth/auth.store'
import usersStore from '../store/users/users.store'
import dialogStore from '../store/dialog/dialog.store'
import { ChangePasswordFormValues } from './dialogs/ChangePasswordDialog'

interface HeaderProps {
  collapsed: boolean
  onToggle: () => void
}

const Header: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  const { user, logout } = authStore
  const { changePassword } = usersStore
  const { openDialog, closeDialog } = dialogStore

  const onChangePassword = async (values: ChangePasswordFormValues) => {
    changePassword(values).then(closeDialog)
  }

  const openChangePasswordDialog = () => {
    openDialog({
      type: 'ChangePassword',
      title: 'Изменить пароль',
      props: {
        onFinish: onChangePassword
      }
    })
  }

  return (
    <Layout.Header className="header">
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'header__collapse',
        onClick: onToggle
      })}

      <Typography.Text>
        {user?.realName} - {user?.name}
      </Typography.Text>

      <Space>
        <TypedDropdown
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={openChangePasswordDialog}
              >
                Изменить пароль
              </Menu.Item>
            </Menu>
          }
          destroyPopupOnHide
        >
          <Button type="primary" icon={<UserOutlined />} />
        </TypedDropdown>

        <Hint
          tooltipProps={{ title: 'Выйти' }}
          buttonProps={{
            type: 'primary',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: logout
          }}
        />
      </Space>
    </Layout.Header>
  )
}

export default observer(Header)