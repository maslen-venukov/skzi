import React, { useEffect } from 'react'
import { Form, Input, Checkbox, Button, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import useTypedSelector from '../../hooks/useTypedSelector'
import { selectRoles } from '../../store/roles/roles.slice'
import { selectUsers } from '../../store/users/users.slice'
import { User } from '../../store/users/users.types'

export interface UsersFormValues {
  name: string
  realName: string
  isActive: boolean
  roleId: number
}

interface UsersFormProps {
  user?: User | null
  onFinish: (values: UsersFormValues) => void
}

const UsersForm: React.FC<UsersFormProps> = ({ user, onFinish }) => {
  const { isLoading: isUsersLoading } = useTypedSelector(selectUsers)
  const { isLoading: isRolesLoading, roles } = useTypedSelector(selectRoles)
  const [form] = useForm<UsersFormValues>()

  useEffect(() => {
    if(!user) return

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

export default UsersForm