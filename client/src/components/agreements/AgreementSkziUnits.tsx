import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Table } from 'antd'
import StatusTag from '../StatusTag'
import TypedCollapse from '../TypedCollapse'
import { SkziUnit } from '../../store/skzi-units/skzi-units.types'
import { VipnetLan } from '../../store/vipnet-lans/vipnet-lans.types'
import { Type } from '../../interfaces/type.interface'
import { Org } from '../../store/orgs/orgs.types'

interface AgreementSkziUnitsProps {
  skziUnits: SkziUnit[]
  isLoading: boolean
}

const AgreementSkziUnits: React.FC<AgreementSkziUnitsProps> = ({
  skziUnits,
  isLoading
}) => {
  const navigate = useNavigate()

  const total = useMemo(() => skziUnits.length, [skziUnits])

  const collapsible = useMemo(() => !isLoading && total == 0 ? 'disabled' : undefined, [isLoading, total])

  return (
    <TypedCollapse>
      <TypedCollapse.Panel
        key="1"
        header="СКЗИ"
        collapsible={collapsible}
        extra={<Badge count={total} showZero />}
      >
        <Table
          dataSource={skziUnits}
          loading={isLoading}
          rowKey="id"
          bordered
          onRow={record => ({
            onDoubleClick: () => navigate(`/skzi-units/${record.id}`)
          })}
        >
          <Table.Column title="Серийный номер" dataIndex="serialNum" key="serialNum" />
          <Table.Column title="Активно" dataIndex="isActive" key="isActive" render={isActive => <StatusTag value={isActive} />} />
          <Table.Column title="Инвентарный номер" dataIndex="invNum" key="invNum" />
          <Table.Column title="Лицензионный номер" dataIndex="licSkziNum" key="licSkziNum" />
          <Table.Column title="Номер СКЗИ" dataIndex="serialSkziNum" key="serialSkziNum" />
          <Table.Column title="Повреждено" dataIndex="isBroken" key="isBroken" render={isBroken => <StatusTag value={isBroken} />} />
          <Table.Column title="Местоположение" dataIndex="location" key="location" />
          <Table.Column title="ViPNet" dataIndex="vipnetLan" key="vipnetLan" render={({ lanNum }: VipnetLan) => lanNum} />
          <Table.Column title="Тип" dataIndex="skziType" key="skziType" render={({ type }: Type) => type} />
          <Table.Column title="Платформа" dataIndex="platformType" key="platformType" render={(type: Type) => type?.type} />
          <Table.Column title="Владелец" dataIndex="skziOwner" key="skziOwner" render={(org: Org) => org?.name} />
        </Table>
      </TypedCollapse.Panel>
    </TypedCollapse>
  )
}

export default AgreementSkziUnits