import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge, Table } from 'antd'
import TypedCollapse from '../TypedCollapse'
import { formatDate } from '../../utils/format'
import { Act } from '../../store/acts/acts.types'
import { SkziUnit } from '../../store/skzi-units/skzi-units.types'
import { Type } from '../../interfaces/type.interface'

interface AgreementActsProps {
  acts: Act[]
  isLoading: boolean
}

const AgreementActs: React.FC<AgreementActsProps> = ({ acts, isLoading }) => {
  const navigate = useNavigate()

  const total = useMemo(() => acts.length, [acts])

  const collapsible = useMemo(() => !isLoading && total == 0 ? 'disabled' : undefined, [isLoading, total])

  return (
    <TypedCollapse>
      <TypedCollapse.Panel
        key="1"
        header="Акты"
        collapsible={collapsible}
        extra={<Badge count={total} showZero />}
      >
        <Table
          dataSource={acts}
          loading={isLoading}
          rowKey="id"
          bordered
          onRow={record => ({
            onDoubleClick: () => navigate(`/acts/${record.id}`)
          })}
        >
          <Table.Column title="Номер" dataIndex="number" key="number" />

          <Table.Column title="Дата" dataIndex="date" key="date" render={formatDate} />

          <Table.Column
            title="СКЗИ"
            dataIndex="skziUnit"
            key="skziUnit"
            render={({ id, serialNum }: SkziUnit) => <Link to={`/skzi-units/${id}`}>{serialNum || id}</Link>}
          />

          <Table.Column title="Тип подписи" dataIndex="signType" key="signType" render={({ type }: Type) => type} />

          <Table.Column title="Инвентарный номер" dataIndex="eqInventoryNum" key="eqInventoryNum" />
        </Table>
      </TypedCollapse.Panel>
    </TypedCollapse>
  )
}

export default AgreementActs