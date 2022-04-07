import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Table } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Hint from '../components/Hint'
import StatusTag from '../components/StatusTag'
import usersStore from '../store/users/users.store'
import rolesStore from '../store/roles/roles.store'
import dialogStore from '../store/dialog/dialog.store'
import getDelta from '../utils/getDelta'
import { User } from '../store/users/users.types'
import { UpdateUserFormValues } from '../components/dialogs/UpdateUserDialog'

const Users: React.FC = () => {
  const { users, isLoading, getUsers, setUsers, updateUser } = usersStore
  const { getRoles, setRoles } = rolesStore
  const { openDialog, closeDialog } = dialogStore

  const onUpdate = (user: User) => async (values: UpdateUserFormValues) => {
    const delta = getDelta(values, {
      ...user,
      roleId: user.role.id
    })

    if(Object.keys(delta).length) {
      await updateUser(user.id, delta)
    }

    closeDialog()
  }

  const openUpdateDialog = (user: User) => {
    openDialog({
      type: 'UpdateUser',
      title: user.realName,
      props: {
        user,
        onFinish: onUpdate(user)
      }
    })
  }

  useEffect(() => {
    Promise.all([
      getUsers(),
      getRoles()
    ])

    return () => {
      setUsers([])
      setRoles([])
    }
  }, [getUsers, getRoles, setUsers, setRoles])

  return (
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
              onClick: () => openUpdateDialog(record)
            }}
          />
        )}
      />
    </Table>
  )
}

export default observer(Users)