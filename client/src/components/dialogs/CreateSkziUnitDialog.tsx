import React, { useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form, Input, Select } from 'antd'
import FormSearchSelect from '../FormSearchSelect'
import skziUnitsStore from '../../store/skzi-units/skzi-units.store'
import vipnetLansStore from '../../store/vipnet-lans/vipnet-lans.store'
import skziTypesStore from '../../store/skzi-types/skzi-types.store'
import platformTypesStore from '../../store/platform-types/platform-types.store'
import orgsStore from '../../store/orgs/orgs.store'
import includes from '../../utils/includes'
import { Type } from '../../interfaces/type.interface'

export interface CreateSkziUnitFormValues {
  serialNum?: string
  invNum?: string
  licSkziNum?: string
  serialSkziNum?: string
  location?: string
  vipnetLanId: number
  agreementId?: string
  skziTypeId: number
  platformTypeId?: number
  skziOwnerId?: number
}

interface CreateSkziUnitDialogProps {
  onFinish: (values: CreateSkziUnitFormValues) => Promise<void>
}

const CreateSkziUnitDialog: React.FC<CreateSkziUnitDialogProps> = ({ onFinish }) => {
  const [vipnetLanNum, setVipnetLanNum] = useState('')
  const [skziType, setSkziType] = useState('')
  const [platformType, setPlatformType] = useState('')
  const [orgName, setOrgName] = useState('')
  const { isLoading: isSkziUnitsLoading } = skziUnitsStore
  const { vipnetLans, isLoading: isVipnetLansLoading } = vipnetLansStore
  const { types: skziTypes, isLoading: isSkziTypesLoading } = skziTypesStore
  const { types: platformTypes, isLoading: isPlatformTypesLoading } = platformTypesStore
  const { orgs, isLoading: isOrgsLoading } = orgsStore

  const filteredVipnetLans = useMemo(() => (
    vipnetLans.filter(({ lanNum }) => includes(lanNum.toString(), vipnetLanNum))
  ), [vipnetLans, vipnetLanNum])

  const filteredSkziTypes = useMemo(() => (
    skziTypes.filter(({ type }) => includes(type, skziType))
  ), [skziTypes, skziType])

  const filteredPlatformTypes = useMemo(() => (
    platformTypes.filter(({ type }) => includes(type, platformType))
  ), [platformTypes, platformType])

  const filteredOrgs = useMemo(() => (
    orgs.filter(({ name }) => includes(name, orgName))
  ), [orgs, orgName])

  const renderTypeOption = ({ id, type }: Type) => (
    <Select.Option key={id} value={id} >
      {type}
    </Select.Option>
  )

  return (
    <Form
      layout="vertical"
      validateTrigger="onBlur"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item label="Серийный номер" name="serialNum">
        <Input />
      </Form.Item>

      <Form.Item label="Инвентарный номер" name="invNum">
        <Input />
      </Form.Item>

      <Form.Item label="Лицензионный номер" name="licSkziNum">
        <Input />
      </Form.Item>

      <Form.Item label="Серийный номер СКЗИ" name="serialSkziNum">
        <Input />
      </Form.Item>

      <Form.Item label="Местоположение" name="location">
        <Input />
      </Form.Item>

      <FormSearchSelect
        items={filteredVipnetLans}
        label="ViPNet"
        name="vipnetLanId"
        rules={[{ required: true, message: 'Пожалуйста выберите ViPNet LAN' }]}
        isLoading={isVipnetLansLoading}
        value={vipnetLanNum}
        setValue={setVipnetLanNum}
        renderItem={({ id, lanNum }) => (
          <Select.Option key={id} value={id} >
            {lanNum}
          </Select.Option>
        )}
      />

      <Form.Item label="Соглашение" name="agreementId">
        <Input />
      </Form.Item>

      <FormSearchSelect
        items={filteredSkziTypes}
        label="Тип"
        name="skziTypeId"
        rules={[{ required: true, message: 'Пожалуйста выберите тип СКЗИ' }]}
        isLoading={isSkziTypesLoading}
        value={skziType}
        setValue={setSkziType}
        renderItem={renderTypeOption}
      />

      <FormSearchSelect
        items={filteredPlatformTypes}
        label="Платформа"
        name="platformTypeId"
        isLoading={isPlatformTypesLoading}
        value={platformType}
        setValue={setPlatformType}
        renderItem={renderTypeOption}
      />

      <FormSearchSelect
        items={filteredOrgs}
        label="Владелец"
        name="skziOwnerId"
        isLoading={isOrgsLoading}
        value={orgName}
        setValue={setOrgName}
        renderItem={({ id, name }) => (
          <Select.Option key={id} value={id} >
            {name}
          </Select.Option>
        )}
      />

      <Form.Item>
        <Button
          loading={isSkziUnitsLoading}
          type="primary"
          htmlType="submit"
        >
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(CreateSkziUnitDialog)