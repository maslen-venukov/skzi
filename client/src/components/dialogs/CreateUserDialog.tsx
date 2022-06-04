import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form, Input, Select } from 'antd'
import rolesStore from '../../store/roles/roles.store'
import usersStore from '../../store/users/users.store'

export interface CreateUserFormValues {
  name: string
  password: string
  realName: string
  roleId: number
}

interface CreateUserDialogProps {
  onFinish: (values: CreateUserFormValues) => Promise<void>
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ onFinish }) => {
  const { isLoading: isUsersLoading } = usersStore
  const { roles, isLoading: isRolesLoading } = rolesStore

  return (
    <Form
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
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
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
        label="Роль"
        name="roleId"
        rules={[{ required: true, message: 'Пожалуйста выберите роль' }]}
      >
        <Select loading={isRolesLoading}>
          {roles.map(({ id, role }) => (
            <Select.Option key={id} value={id}>
              {role}
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
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(CreateUserDialog)