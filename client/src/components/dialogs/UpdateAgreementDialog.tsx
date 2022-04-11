import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import moment, { Moment } from 'moment'
import FormSearchSelect from '../FormSearchSelect'
import agreementsStore from '../../store/agreements/agreements.store'
import agreementTypesStore from '../../store/agreement-types/agreement-types.store'
import orgsStore from '../../store/orgs/orgs.store'
import includes from '../../utils/includes'
import { Agreement } from '../../store/agreements/agreements.types'
import { Org } from '../../store/orgs/orgs.types'

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

interface UpdateAgreementDialogProps {
  agreement: Agreement
  onFinish: (values: UpdateAgreementFormValues) => Promise<void>
}

const UpdateAgreementDialog: React.FC<UpdateAgreementDialogProps> = ({
  agreement,
  onFinish
}) => {
  const [nodeName, setNodeName] = useState('')
  const [segmentName, setSegmentName] = useState('')
  const [typeName, setTypeName] = useState('')
  const [form] = useForm<UpdateAgreementFormValues>()
  const { isLoading: isAgreementsLoading } = agreementsStore
  const { types, isLoading: isTypesLoading } = agreementTypesStore
  const { orgs, isLoading: isOrgsLoading } = orgsStore

  const nodes = useMemo(() => (
    orgs.filter(org => includes(org.name, nodeName))
  ), [orgs, nodeName])

  const segments = useMemo(() => (
    orgs.filter(org => includes(org.name, segmentName))
  ), [orgs, segmentName])

  const filteredTypes = useMemo(() => (
    types.filter(({ type }) => includes(type, typeName))
  ), [types, typeName])

  const renderOrgOption = ({ id, name }: Org) => (
    <Select.Option key={id} value={id}>
      {name}
    </Select.Option>
  )

  useEffect(() => {
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

      <FormSearchSelect
        items={filteredTypes}
        label="Тип"
        name="typeId"
        rules={[{ required: true, message: 'Пожалуйста выберите тип' }]}
        isLoading={isTypesLoading}
        value={typeName}
        setValue={setTypeName}
        renderItem={({ id, type }) => (
          <Select.Option key={id} value={id}>
            {type}
          </Select.Option>
        )}
      />

      <Form.Item
        label="Дата начала"
        name="beginDate"
        rules={[{ required: true, message: 'Пожалуйста выберите дату начала' }]}
      >
        <DatePicker format="DD.MM.YYYY" />
      </Form.Item>

      <Form.Item
        label="Дата окончания"
        name="endDate"
      >
        <DatePicker format="DD.MM.YYYY" />
      </Form.Item>

      <Form.Item
        label="Дата расторжения"
        name="terminationDate"
      >
        <DatePicker format="DD.MM.YYYY" />
      </Form.Item>

      <Form.Item
        label="Родительское соглашение"
        name="parentId"
      >
        <Input />
      </Form.Item>

      <FormSearchSelect
        items={nodes}
        label="Узел"
        name="contractorNodeId"
        rules={[{ required: true, message: 'Пожалуйста введите узел' }]}
        isLoading={isOrgsLoading}
        value={nodeName}
        setValue={setNodeName}
        renderItem={renderOrgOption}
      />

      <FormSearchSelect
        items={segments}
        label="Сегмент"
        name="contractorSegmentId"
        isLoading={isOrgsLoading}
        value={segmentName}
        setValue={setSegmentName}
        renderItem={renderOrgOption}
      />

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

export default observer(UpdateAgreementDialog)