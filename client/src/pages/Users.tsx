import React, { useState, useEffect, Suspense } from 'react'
import { observer } from 'mobx-react-lite'
import { Drawer, Table } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Hint from '../components/Hint'
import StatusTag from '../components/StatusTag'
import Loader from '../components/Loader'
import usersStore from '../store/users/users.store'
import rolesStore from '../store/roles/roles.store'
import useBoolean from '../hooks/useBoolean'
import getDelta from '../utils/getDelta'
import { User } from '../store/users/users.types'
import { UsersFormValues } from '../components/users/UsersForm'

const UsersForm = React.lazy(() => import('../components/users/UsersForm'))

const Users: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const { users, isLoading, getUsers, setUsers, updateUser } = usersStore
  const { getRoles, setRoles } = rolesStore
  const drawerVisible = useBoolean()

  const openDrawer = (user: User) => {
    setCurrentUser(user)
    drawerVisible.setTrue()
  }

  const closeDrawer = () => {
    drawerVisible.setFalse()
    setTimeout(() => {
      setCurrentUser(null)
    }, 300)
  }

  const onUpdate = (values: UsersFormValues) => {
    if(!currentUser) return

    const delta = getDelta(values, {
      ...currentUser,
      roleId: currentUser.role.id
    })

    if(Object.keys(delta).length) {
      updateUser(currentUser.id, delta)
    }

    closeDrawer()
  }

  useEffect(() => {
    getUsers()
    getRoles()

    return () => {
      setUsers([])
      setRoles([])
    }
  }, [getUsers, getRoles, setUsers, setRoles])

  return (
    <>
      <Table
        dataSource={users}
        loading={isLoading}
        rowKey="id"
        bordered
      >
        <Table.Column title="Логин" dataIndex="name" key="name" />
        <Table.Column title="Имя" dataIndex="realName" key="realName" />
        <Table.Column title="Активен" dataIndex="isActive" key="isActive" render={value => <StatusTag value={value} />} />
        <Table.Column title="Роль" key="role" render={(_, record: User) => record.role.role} />
        <Table.Column
          title="Действия"
          key="actions"
          render={(_, record: User) => (
            <Hint
              tooltipProps={{ title: 'Редактировать' }}
              buttonProps={{
                type: 'primary',
                shape: 'circle',
                icon: <EditOutlined />,
                onClick: () => openDrawer(record)
              }}
            />
          )}
        />
      </Table>

      <Drawer
        title={currentUser?.realName}
        visible={drawerVisible.value}
        onClose={closeDrawer}
      >
        <Suspense fallback={<Loader />}>
          <UsersForm onFinish={onUpdate} user={currentUser} />
        </Suspense>
      </Drawer>
    </>
  )
}

export default observer(Users)