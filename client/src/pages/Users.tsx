import React, { useState, useEffect, Suspense } from 'react'
import { Drawer, Table } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Hint from '../components/Hint'
import StatusTag from '../components/StatusTag'
import Loader from '../components/Loader'
import { getUsers, updateUser } from '../store/users/users.thunks'
import { getRoles } from '../store/roles/roles.thunks'
import { selectAuth } from '../store/auth/auth.slice'
import { clearUsers, selectUsers } from '../store/users/users.slice'
import { clearRoles } from '../store/roles/roles.slice'
import useBoolean from '../hooks/useBoolean'
import useTypedDispatch from '../hooks/useTypedDispatch'
import useTypedSelector from '../hooks/useTypedSelector'
import getDelta from '../utils/getDelta'
import isRoleMatch from '../utils/isRoleMatch'
import { User } from '../store/users/users.types'
import { Roles } from '../enums/Roles'
import { UserFormValues } from '../components/users/UserForm'

const UserForm = React.lazy(() => import('../components/users/UserForm'))

const Users: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const dispatch = useTypedDispatch()
  const { user } = useTypedSelector(selectAuth)
  const { isLoading: isUsersLoading, users } = useTypedSelector(selectUsers)
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

  const onEdit = (values: UserFormValues) => {
    if(!currentUser) return

    const delta = getDelta(values, {
      ...currentUser,
      roleId: currentUser.role.id
    })

    if(Object.keys(delta).length) {
      dispatch(updateUser({
        ...delta,
        id: currentUser.id,
      }))
    }

    closeDrawer()
  }

  useEffect(() => {
    dispatch(getUsers())

    return () => {
      dispatch(clearUsers())
      dispatch(clearRoles())
    }
  }, [dispatch])

  useEffect(() => {
    if(user && isRoleMatch(user.role.role, Roles.Admin)) {
      dispatch(getRoles())
    }
  }, [user, dispatch])

  return (
    <>
      <Table
        dataSource={users}
        loading={isUsersLoading}
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
          <UserForm onFinish={onEdit} user={currentUser} />
        </Suspense>
      </Drawer>
    </>
  )
}

export default Users