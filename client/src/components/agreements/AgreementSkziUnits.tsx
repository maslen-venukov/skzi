import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Collapse, Table } from 'antd'
import StatusTag from '../StatusTag'
import { SkziUnit } from '../../store/skzi-units/skzi-units.types'
import { VipnetLan } from '../../store/vipnet-lans/vipnet-lans.types'
import { Type } from '../../interfaces/type.interface'
import { Org } from '../../store/orgs/orgs.types'

interface AgreementSkziUnitsProps {
  isLoading: boolean
  skziUnits: SkziUnit[]
}

const AgreementSkziUnits: React.FC<AgreementSkziUnitsProps> = ({
  isLoading,
  skziUnits
}) => {
  const navigate = useNavigate()

  const total = useMemo(() => skziUnits.length, [skziUnits])

  return (
    <Collapse>
      <Collapse.Panel header="СКЗИ" extra={<Badge count={total} showZero />}>
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
          <Table.Column title="Серийный номер СКЗИ" dataIndex="serialSkziNum" key="serialSkziNum" />
          <Table.Column title="Повреждено" dataIndex="isBroken" key="isBroken" render={isBroken => <StatusTag value={isBroken} />} />
          <Table.Column title="Местоположение" dataIndex="location" key="location" />
          <Table.Column title="ViPNet" dataIndex="vipnetLan" key="vipnetLan" render={({ lanNum }: VipnetLan) => lanNum} />
          <Table.Column title="Тип" dataIndex="skziType" key="skziType" render={({ type }: Type) => type} />
          <Table.Column title="Платформа" dataIndex="platformType" key="platformType" render={(type: Type) => type?.type} />
          <Table.Column title="Владелец" dataIndex="skziOwner" key="skziOwner" render={(org: Org) => org?.name} />
        </Table>
      </Collapse.Panel>
    </Collapse>
  )
}

export default AgreementSkziUnits