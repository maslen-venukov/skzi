import React, { useEffect } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import moment, { Moment } from 'moment'
import { selectAgreements } from '../../store/agreements/agreements.slice'
import { selectAgreementTypes } from '../../store/agreementTypes/agreementTypes.slice'
import useTypedSelector from '../../hooks/useTypedSelector'
import { Agreement } from '../../store/agreements/agreements.types'

export interface AgreementsFormValues {
  number: string
  typeId: number
  beginDate: Moment
  endDate?: Moment
  terminationDate?: Moment
  contractorNodeId: number
  contractorSegmentId?: number
  parentId?: number
}

interface AgreementsFormProps {
  agreement?: Agreement | null
  submitText: string
  onFinish: (values: AgreementsFormValues) => void
}

const AgreementsForm: React.FC<AgreementsFormProps> = ({ agreement, submitText, onFinish }) => {
  const { isLoading: isAgreementsLoading } = useTypedSelector(selectAgreements)
  const { isLoading: isTypesLoading, types } = useTypedSelector(selectAgreementTypes)
  const [form] = useForm<AgreementsFormValues>()

  useEffect(() => {
    if(!agreement) return

    form.setFieldsValue({
      ...agreement,
      typeId: agreement.type.id,
      beginDate: moment(agreement.beginDate),
      endDate: agreement.endDate && moment(agreement.endDate),
      terminationDate: agreement.terminationDate && moment(agreement.terminationDate),
      contractorNodeId: agreement.contractorNode.id,
      contractorSegmentId: agreement.contractorSegment?.id
    })
  }, [form, agreement])

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
        name="isActive"
        valuePropName="checked"
      >
        <Checkbox>Активен</Checkbox>
      </Form.Item>

      <Form.Item
        label="Тип"
        name="typeId"
        rules={[{ required: true, message: 'Пожалуйста выберите тип' }]}
      >
        <Select loading={isTypesLoading}>
          {types.map(type => (
            <Select.Option
              key={type.id}
              value={type.id}
            >
              {type.type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Дата начала"
        name="beginDate"
        rules={[{ required: true, message: 'Пожалуйста выберите дату начала' }]}
      >
        <DatePicker format={'DD.MM.YYYY'} />
      </Form.Item>

      <Form.Item
        label="Дата окончания"
        name="endDate"
      >
        <DatePicker format={'DD.MM.YYYY'} />
      </Form.Item>

      <Form.Item
        label="Дата расторжения"
        name="terminationDate"
      >
        <DatePicker format={'DD.MM.YYYY'} />
      </Form.Item>

      <Form.Item
        label="Родительское соглашение"
        name="parentId"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Узел"
        name="contractorNodeId"
        rules={[{ required: true, message: 'Пожалуйста введите узел' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Сегмент"
        name="contractorSegmentId"
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          loading={isAgreementsLoading}
          type="primary"
          htmlType="submit"
        >
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AgreementsForm