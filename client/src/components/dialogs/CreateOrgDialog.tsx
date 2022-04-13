import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form, Input } from 'antd'
import orgsStore from '../../store/orgs/orgs.store'

export interface CreateOrgFormValues {
  name: string
  inn: string
}

interface CreateOrgDialogProps {
  onFinish: (values: CreateOrgFormValues) => Promise<void>
}

const CreateOrgDialog: React.FC<CreateOrgDialogProps> = ({ onFinish }) => {
  const { isLoading } = orgsStore

  return (
    <Form
      layout="vertical"
      validateTrigger="onBlur"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="Наименование"
        name="name"
        rules={[{ required: true, message: 'Пожалуйста введите наименование' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ИНН"
        name="inn"
        rules={[{ required: true, message: 'Пожалуйста введите ИНН' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
        >
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(CreateOrgDialog)