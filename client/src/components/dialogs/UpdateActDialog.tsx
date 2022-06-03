import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import moment, { Moment } from 'moment'
import actsStore from '../../store/acts/acts.store'
import signTypesStore from '../../store/sign-types/sign-types.store'
import { Act } from '../../store/acts/acts.types'

export interface UpdateActFormValues {
  number: string
  date: Moment
  agreementId: string
  skziUnitId: string
  signTypeId: number
  eqInventoryNum?: string
}

interface UpdateActDialogProps {
  act: Act
  onFinish: (values: UpdateActFormValues) => Promise<void>
}

const UpdateActDialog: React.FC<UpdateActDialogProps> = ({ act, onFinish }) => {
  const [form] = useForm<UpdateActFormValues>()
  const { isLoading: isActsLoading } = actsStore
  const { types, isLoading: isTypesLoading } = signTypesStore

  useEffect(() => {
    form.setFieldsValue({
      ...act,
      date: moment(act.date),
      agreementId: act.agreement.id.toString(),
      skziUnitId: act.skziUnit.id.toString(),
      signTypeId: act.signType.id
    })
  }, [form, act])

  return (
    <Form
      form={form}
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
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(UpdateActDialog)