import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Input, Checkbox, Button, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import usersStore from '../../store/users/users.store'
import rolesStore from '../../store/roles/roles.store'
import { User } from '../../store/users/users.types'

export interface UpdateUserFormValues {
  name: string
  realName: string
  isActive: boolean
  roleId: number
}

interface UsersDialogProps {
  user: User
  onFinish: (values: UpdateUserFormValues) => Promise<void>
}

const UpdateUserDialog: React.FC<UsersDialogProps> = ({ user, onFinish }) => {
  const [form] = useForm<UpdateUserFormValues>()
  const { isLoading: isUsersLoading } = usersStore
  const { roles, isLoading: isRolesLoading } = rolesStore

  useEffect(() => {
    form.setFieldsValue({
      ...user,
      roleId: user.role.id
    })
  }, [form, user])

  return (
    <Form
      form={form}
      layout="vertical"
      validateTrigger="onBlur"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="Логин"
        name="name"
        rules={[{ required: true, message: 'Пожалуйста введите логин' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Имя"
        name="realName"
        rules={[{ required: true, message: 'Пожалуйста введите имя' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="isActive"
        valuePropName="checked"
      >
        <Checkbox>Активен</Checkbox>
      </Form.Item>

      <Form.Item
        label="Роль"
        name="roleId"
        rules={[{ required: true }]}
      >
        <Select loading={isRolesLoading}>
          {roles.map(role => (
            <Select.Option
              key={role.id}
              value={role.id}
            >
              {role.role}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          loading={isUsersLoading}
          type="primary"
          htmlType="submit"
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(UpdateUserDialog)