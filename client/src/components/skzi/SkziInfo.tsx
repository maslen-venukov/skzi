import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Descriptions } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { SkziUnit } from '../../store/skzi-units/skzi-units.types'
import Hint from '../Hint'
import StatusTag from '../StatusTag'

interface SkziInfoProps {
  skziUnit: SkziUnit
  isAdmin: boolean
  onUpdateClick: () => void
}

const SkziInfo: React.FC<SkziInfoProps> = ({
  skziUnit,
  isAdmin,
  onUpdateClick
}) => (
  <Card
    title={skziUnit.serialNum}
    extra={isAdmin && (
      <Hint
        tooltipProps={{ title: 'Редактировать' }}
        buttonProps={{
          type: 'primary',
          shape: 'circle',
          icon: <EditOutlined />,
          onClick: onUpdateClick
        }}
      />
    )}
  >
    <Descriptions>
      <Descriptions.Item label="Идентификатор" span={3}>{skziUnit.id}</Descriptions.Item>

      <Descriptions.Item label="Серийный номер" span={1}>{skziUnit.serialNum}</Descriptions.Item>

      <Descriptions.Item label="Инвентарный номер" span={1}>{skziUnit.invNum}</Descriptions.Item>

      <Descriptions.Item label="Лицензионный номер" span={1}>{skziUnit.licSkziNum}</Descriptions.Item>

      <Descriptions.Item label="Номер СКЗИ" span={3}>{skziUnit.serialSkziNum}</Descriptions.Item>

      <Descriptions.Item label="Активно" span={1}>
        <StatusTag value={skziUnit.isActive} />
      </Descriptions.Item>

      <Descriptions.Item label="Повреждено" span={2}>
        <StatusTag value={skziUnit.isBroken} />
      </Descriptions.Item>

      <Descriptions.Item label="Местоположение" span={3}>{skziUnit.location}</Descriptions.Item>

      <Descriptions.Item label="ViPNet" span={1}>{skziUnit.vipnetLan.lanNum}</Descriptions.Item>

      <Descriptions.Item label="Тип" span={1}>{skziUnit.skziType.type}</Descriptions.Item>

      <Descriptions.Item label="Платформа" span={1}>{skziUnit.platformType?.type}</Descriptions.Item>

      <Descriptions.Item label="Соглашение" span={1}>
        <Link to={`/agreements/${skziUnit.agreement?.id}`}>{skziUnit.agreement?.number}</Link>
      </Descriptions.Item>

      <Descriptions.Item label="Владелец" span={2}>
        <Link to={`/orgs/${skziUnit.skziOwner?.id}`}>{skziUnit.skziOwner?.name}</Link>
      </Descriptions.Item>
    </Descriptions>
  </Card>
)

export default SkziInfo