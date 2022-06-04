import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Descriptions, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Hint from '../Hint'
import StatusTag from '../StatusTag'
import Confirm from '../Confirm'
import { SkziUnit } from '../../store/skzi-units/skzi-units.types'


interface SkziInfoProps {
  skziUnit: SkziUnit
  isLoading: boolean
  isAdmin: boolean
  onUpdateClick: () => void
  onRemove: (id: number) => Promise<void>
}

const SkziInfo: React.FC<SkziInfoProps> = ({
  skziUnit,
  isLoading,
  isAdmin,
  onUpdateClick,
  onRemove
}) => (
  <Card
    title={skziUnit.serialNum}
    loading={isLoading}
    extra={isAdmin && (
      <Space>
        <Hint
          tooltipProps={{ title: 'Редактировать' }}
          buttonProps={{
            type: 'primary',
            shape: 'circle',
            icon: <EditOutlined />,
            onClick: onUpdateClick
          }}
        />

        <Confirm
          popconfirmProps={{
            title: 'Вы действительно хотите удалить СКЗИ?',
            placement: 'topRight'
          }}
          tooltipProps={{ title: 'Удалить' }}
          buttonProps={{
            type: 'primary',
            icon: <DeleteOutlined />,
            danger: true
          }}
          onConfirm={() => onRemove(skziUnit.id)}
        />
      </Space>
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