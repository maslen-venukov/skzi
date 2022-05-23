import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Space, Table } from 'antd'
import { PlusOutlined, EditOutlined, FileDoneOutlined } from '@ant-design/icons'
import Hint from '../components/Hint'
import StatusTag from '../components/StatusTag'
import authStore from '../store/auth/auth.store'
import skziUnitsStore from '../store/skzi-units/skzi-units.store'
import vipnetLansStore from '../store/vipnet-lans/vipnet-lans.store'
import skziTypesStore from '../store/skzi-types/skzi-types.store'
import platformTypesStore from '../store/platform-types/platform-types.store'
import orgsStore from '../store/orgs/orgs.store'
import dialogStore from '../store/dialog/dialog.store'
import { SkziUnit } from '../store/skzi-units/skzi-units.types'
import { VipnetLan } from '../store/vipnet-lans/vipnet-lans.types'
import { Agreement } from '../store/agreements/agreements.types'
import { Type } from '../interfaces/type.interface'
import { Org } from '../store/orgs/orgs.types'
import { CreateSkziUnitFormValues } from '../components/dialogs/CreateSkziUnitDialog'
import { UpdateSkziUnitFormValues } from '../components/dialogs/UpdateSkziUnitDialog'
import getDelta from '../utils/getDelta'
import nullify from '../utils/nullify'

const SkziUnits: React.FC = () => {
  const { isOperator, isAdmin } = authStore
  const {
    skziUnits,
    isLoading,
    getSkziUnits,
    createSkziUnit,
    updateSkziUnit,
    setSkziUnits
  } = skziUnitsStore
  const { getVipnetLans, setVipnetLans } = vipnetLansStore
  const { getSkziTypes, setSkziTypes } = skziTypesStore
  const { getPlatformTypes, setPlatformTypes } = platformTypesStore
  const { getOrgs, setOrgs } = orgsStore
  const { openDialog, closeDialog } = dialogStore
  const navigate = useNavigate()

  const onCreate = async (values: CreateSkziUnitFormValues) => {
    await createSkziUnit({
      ...values,
      agreementId: Number(values.agreementId) || undefined
    })
    closeDialog()
  }

  const onUpdate = (skziUnit: SkziUnit) => async (values: UpdateSkziUnitFormValues) => {
    const delta = nullify(getDelta(values, {
      ...skziUnit,
      vipnetLanId: skziUnit.vipnetLan.id,
      skziTypeId: skziUnit.skziType.id,
      platformTypeId: skziUnit.platformType?.id,
      skziOwnerId: skziUnit.skziOwner?.id,
      agreementId: skziUnit.agreement?.id.toString()
    }))

    if(Object.keys(delta).length) {
      await updateSkziUnit(skziUnit.id, delta)
    }

    closeDialog()
  }

  const openCreateDialog = () => openDialog({
    type: 'CreateSkziUnit',
    title: 'Новое СКЗИ',
    props: {
      onFinish: onCreate
    }
  })

  const openUpdateDialog = (skziUnit: SkziUnit) => {
    openDialog({
      type: 'UpdateSkziUnit',
      title: skziUnit.serialNum,
      props: {
        skziUnit,
        onFinish: onUpdate(skziUnit)
      }
    })
  }

  useEffect(() => {
    Promise.all([
      getSkziUnits(),
      ...isOperator ? [
        getVipnetLans(),
        getSkziTypes(),
        getPlatformTypes(),
        getOrgs()
      ] : []
    ])

    return () => {
      setSkziUnits([])
      setVipnetLans([])
      setSkziTypes([])
      setPlatformTypes([])
      setOrgs([])
    }
  }, [getSkziUnits, setSkziUnits])

  return (
    <Table
      dataSource={skziUnits}
      loading={isLoading}
      rowKey="id"
      bordered
      onRow={record => ({
        onDoubleClick: () => navigate(`/skzi-units/${record.id}`)
      })}
      {...isOperator ? {
        title: () => (
          <Hint
            tooltipProps={{ title: 'Добавить' }}
            buttonProps={{
              type: 'primary',
              shape: 'circle',
              icon: <PlusOutlined />,
              onClick: openCreateDialog
            }}
          />
        )
      } : {}}
    >
      <Table.Column title="Серийный номер" dataIndex="serialNum" key="serialNum" />
      <Table.Column title="Активно" dataIndex="isActive" key="isActive" render={isActive => <StatusTag value={isActive} />} />
      <Table.Column title="Инвентарный номер" dataIndex="invNum" key="invNum" />
      <Table.Column title="Лицензионный номер" dataIndex="licSkziNum" key="licSkziNum" />
      <Table.Column title="Номер СКЗИ" dataIndex="serialSkziNum" key="serialSkziNum" />
      <Table.Column title="Повреждено" dataIndex="isBroken" key="isBroken" render={isBroken => <StatusTag value={isBroken} />} />
      <Table.Column title="Местоположение" dataIndex="location" key="location" />
      <Table.Column title="ViPNet" dataIndex="vipnetLan" key="vipnetLan" render={({ lanNum }: VipnetLan) => lanNum} />
      <Table.Column title="Соглашение" dataIndex="agreement" key="agreement" render={(agreement: Agreement) => agreement?.number} />
      <Table.Column title="Тип" dataIndex="skziType" key="skziType" render={({ type }: Type) => type} />
      <Table.Column title="Платформа" dataIndex="platformType" key="platformType" render={(type: Type) => type?.type} />
      <Table.Column title="Владелец" dataIndex="skziOwner" key="skziOwner" render={(org: Org) => org?.name} />
      <Table.Column
        title="Действия"
        key="actions"
        width="0"
        render={(_, record: SkziUnit) => (
          <Space>
            {isAdmin && (
              <Hint
                tooltipProps={{ title: 'Редактировать' }}
                buttonProps={{
                  type: 'primary',
                  shape: 'circle',
                  icon: <EditOutlined />,
                  onClick: () => openUpdateDialog(record)
                }}
              />
            )}

            {record.agreement && (
              <Hint
                tooltipProps={{ title: 'Соглашение' }}
                buttonProps={{
                  type: 'primary',
                  shape: 'circle',
                  icon: <FileDoneOutlined />,
                  onClick: () => navigate(`/agreements/${record.agreement?.id}`)
                }}
              />
            )}
          </Space>
        )}
      />
    </Table>
  )
}

export default observer(SkziUnits)