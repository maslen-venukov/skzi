import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import moment, { Moment } from 'moment'
import Loader from '../Loader'
import agreementsStore from '../../store/agreements/agreements.store'
import agreementTypesStore from '../../store/agreement-types/agreement-types.store'
import orgsStore from '../../store/orgs/orgs.store'
import { Agreement } from '../../store/agreements/agreements.types'

export interface UpdateAgreementFormValues {
  number: string
  isActive: boolean
  typeId: number
  beginDate: Moment
  endDate?: Moment
  terminationDate?: Moment
  parentId?: string
  contractorNodeId: number
  contractorSegmentId?: number
}

interface UpdateAgreementFormProps {
  agreement: Agreement | null
  onFinish: (values: UpdateAgreementFormValues) => void
}

const UpdateAgreementForm: React.FC<UpdateAgreementFormProps> = ({
  agreement,
  onFinish
}) => {
  const [nodeName, setNodeName] = useState('')
  const [segmentName, setSegmentName] = useState('')
  const { isLoading: isAgreementsLoading } = agreementsStore
  const { types, isLoading: isTypesLoading } = agreementTypesStore
  const { orgs, isLoading: isOrgsLoading } = orgsStore
  const [form] = useForm<UpdateAgreementFormValues>()

  const nodes = useMemo(() => (
    orgs.filter(org => org.name.toLowerCase().includes(nodeName.toLowerCase()))
  ), [orgs, nodeName])

  const segments = useMemo(() => (
    orgs.filter(org => org.name.toLowerCase().includes(segmentName.toLowerCase()))
  ), [orgs, segmentName])

  useEffect(() => {
    if(!agreement) return

    form.setFieldsValue({
      ...agreement,
      typeId: agreement.type.id,
      beginDate: moment(agreement.beginDate),
      endDate: agreement.endDate && moment(agreement.endDate),
      terminationDate: agreement.terminationDate && moment(agreement.terminationDate),
      parentId: agreement.parentId?.toString(),
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
        <Select
          loading={isTypesLoading}
          allowClear
        >
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
        <Select
          showSearch
          allowClear
          filterOption={false}
          notFoundContent={isOrgsLoading ? <Loader /> : null}
          value={nodeName}
          onSearch={setNodeName}
        >
          {nodes.map(node => (
            <Select.Option
              key={node.id}
              value={node.id}
            >
              {node.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Сегмент"
        name="contractorSegmentId"
      >
        <Select
          showSearch
          allowClear
          filterOption={false}
          notFoundContent={isOrgsLoading ? <Loader /> : null}
          value={segmentName}
          onSearch={setSegmentName}
        >
          {segments.map(segment => (
            <Select.Option
              key={segment.id}
              value={segment.id}
            >
              {segment.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          loading={isAgreementsLoading}
          type="primary"
          htmlType="submit"
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(UpdateAgreementForm)