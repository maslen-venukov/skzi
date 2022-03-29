import React from 'react'
import { Form, Input, Button } from 'antd'
import { login } from '../store/auth/auth.thunks'
import { selectAuth } from '../store/auth/auth.slice'
import useTypedDispatch from '../hooks/useTypedDispatch'
import useTypedSelector from '../hooks/useTypedSelector'

interface LoginFormValues {
  name: string
  password: string
}

const Login: React.FC = () => {
  const dispatch = useTypedDispatch()
  const { isLoading } = useTypedSelector(selectAuth)

  const onLogin = (values: LoginFormValues) => dispatch(login(values))

  return (
    <div className="login wrapper">
      <Form
        layout="vertical"
        validateTrigger="onBlur"
        className="login__form"
        onFinish={onLogin}
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

export default Login