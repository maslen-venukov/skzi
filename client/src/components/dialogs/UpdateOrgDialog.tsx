import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Checkbox, Form, Input } from 'antd'
import orgsStore from '../../store/orgs/orgs.store'
import { useForm } from 'antd/lib/form/Form'
import { Org } from '../../store/orgs/orgs.types'

export interface UpdateOrgFormValues {
  name: string
  inn: string
  isWorks: boolean
}

interface UpdateOrgDialogProps {
  org: Org
  onFinish: (values: UpdateOrgFormValues) => Promise<void>
}

const UpdateOrgDialog: React.FC<UpdateOrgDialogProps> = ({
  org,
  onFinish
}) => {
  const [form] = useForm<UpdateOrgFormValues>()
  const { isLoading } = orgsStore

  useEffect(() => {
    form.setFieldsValue(org)
  }, [form, org])

  return (
    <Form
      form={form}
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

      <Form.Item
        name="isWorks"
        valuePropName="checked"
      >
        <Checkbox>Работает</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(UpdateOrgDialog)