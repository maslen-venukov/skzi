import React from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Input, Button } from 'antd'
import authStore from '../store/auth/auth.store'

const Login: React.FC = () => {
  const { isLoading, login } = authStore

  return (
    <div className="login wrapper">
      <Form
        layout="vertical"
        validateTrigger="onBlur"
        className="login__form"
        onFinish={login}
      >
        <Form.Item
          label="Логин"
          name="name"
          rules={[{ required: true, message: 'Пожалуйста введите ваш логин' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста введите ваш пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default observer(Login)