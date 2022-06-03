import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import actsStore from '../../store/acts/acts.store'
import signTypesStore from '../../store/sign-types/sign-types.store'

export interface CreateActFormValues {
  number: string
  date: Moment
  agreementId: string
  skziUnitId: string
  signTypeId: number
  eqInventoryNum?: string
}

interface CreateActDialogProps {
  onFinish: (values: CreateActFormValues) => Promise<void>
}

const CreateActDialog: React.FC<CreateActDialogProps> = ({ onFinish }) => {
  const { isLoading: isActsLoading } = actsStore
  const { types, isLoading: isTypesLoading } = signTypesStore

  return (
    <Form
      layout="vertical"
      validateTrigger="onBlur"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="Номер"
        name="number"
        rules={[{ required: true, message: 'Пожалуйста введите номер' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Дата"
        name="date"
        rules={[{ required: true, message: 'Пожалуйста выберите дату' }]}
      >
        <DatePicker format="DD.MM.YYYY" />
      </Form.Item>

      <Form.Item
        label="Соглашение"
        name="agreementId"
        rules={[{ required: true, message: 'Пожалуйста введите соглашение' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="СКЗИ"
        name="skziUnitId"
        rules={[{ required: true, message: 'Пожалуйста введите СКЗИ' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="signTypeId"
        label="Тип подписи"
        rules={[{ required: true }]}
      >
        <Select loading={isTypesLoading}>
          {types.map(({ id, type }) => (
            <Select.Option key={id} value={id}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Инвентарный номер"
        name="eqInventoryNum"
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          loading={isActsLoading}
          type="primary"
          htmlType="submit"
        >
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(CreateActDialog)