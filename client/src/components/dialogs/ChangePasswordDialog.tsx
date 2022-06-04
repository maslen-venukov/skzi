import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form, Input } from 'antd'
import usersStore from '../../store/users/users.store'

export interface ChangePasswordFormValues {
  new: string
  old: string
  repeat: string
}

interface ChangePasswordDialogProps {
  onFinish: (values: ChangePasswordFormValues) => Promise<void>
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ onFinish }) => {
  const { isLoading } = usersStore

  return (
    <Form
      layout="vertical"
      validateTrigger="onBlur"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="Старый пароль"
        name="old"
        rules={[{ required: true, message: 'Пожалуйста введите старый пароль' }]}
      >
        <Input type="password" />
      </Form.Item>

      <Form.Item
        label="Новый пароль"
        name="new"
        rules={[{ required: true, message: 'Пожалуйста введите новый пароль' }]}
      >
        <Input type="password" />
      </Form.Item>

      <Form.Item
        label="Повторите пароль"
        name="repeat"
        dependencies={['new']}
        rules={[
          { required: true, message: 'Пожалуйста повторите пароль' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if(!value || getFieldValue('new') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Пароли не совпадают'))
            }
          })
        ]}
      >
        <Input type="password" />
      </Form.Item>

      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
        >
          Изменить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(ChangePasswordDialog)