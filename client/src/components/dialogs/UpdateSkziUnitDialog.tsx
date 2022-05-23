import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Checkbox, Form, Input, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import FormSearchSelect from '../FormSearchSelect'
import skziUnitsStore from '../../store/skzi-units/skzi-units.store'
import vipnetLansStore from '../../store/vipnet-lans/vipnet-lans.store'
import skziTypesStore from '../../store/skzi-types/skzi-types.store'
import platformTypesStore from '../../store/platform-types/platform-types.store'
import orgsStore from '../../store/orgs/orgs.store'
import includes from '../../utils/includes'
import { SkziUnit } from '../../store/skzi-units/skzi-units.types'
import { Type } from '../../interfaces/type.interface'

export interface UpdateSkziUnitFormValues {
  isActive?: boolean
  invNum?: string
  serialNum?: string
  licSkziNum?: string
  serialSkziNum?: string
  isBroken?: boolean
  location?: string
  vipnetLanId: number
  agreementId?: string
  skziTypeId: number
  platformTypeId?: number
  skziOwnerId?: number
}

interface UpdateSkziUnitDialogProps {
  skziUnit: SkziUnit
  onFinish: (values: UpdateSkziUnitFormValues) => Promise<void>
}

const UpdateSkziUnitDialog: React.FC<UpdateSkziUnitDialogProps> = ({ skziUnit, onFinish }) => {
  const [vipnetLanNum, setVipnetLanNum] = useState('')
  const [skziType, setSkziType] = useState('')
  const [platformType, setPlatformType] = useState('')
  const [orgName, setOrgName] = useState('')
  const [form] = useForm<UpdateSkziUnitFormValues>()
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

  useEffect(() => {
    form.setFieldsValue({
      ...skziUnit,
      vipnetLanId: skziUnit.vipnetLan.id,
      skziTypeId: skziUnit.skziType.id,
      platformTypeId: skziUnit.platformType?.id,
      skziOwnerId: skziUnit.skziOwner?.id,
      agreementId: skziUnit.agreement?.id.toString()
    })
  }, [form, skziUnit])

  return (
    <Form
      form={form}
      layout="vertical"
      validateTrigger="onBlur"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item label="Серийный номер" name="serialNum">
        <Input />
      </Form.Item>

      <Form.Item name="isActive" valuePropName="checked">
        <Checkbox>Активно</Checkbox>
      </Form.Item>

      <Form.Item label="Инвентарный номер" name="invNum">
        <Input />
      </Form.Item>

      <Form.Item label="Лицензионный номер" name="licSkziNum">
        <Input />
      </Form.Item>

      <Form.Item label="Номер СКЗИ" name="serialSkziNum">
        <Input />
      </Form.Item>

      <Form.Item name="isBroken" valuePropName="checked">
        <Checkbox>Повреждено</Checkbox>
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
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(UpdateSkziUnitDialog)