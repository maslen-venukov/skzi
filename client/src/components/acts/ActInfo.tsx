import React from 'react'
import { Card, Descriptions, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Hint from '../Hint'
import Confirm from '../Confirm'
import { formatDate } from '../../utils/format'
import { Act } from '../../store/acts/acts.types'
import { Link } from 'react-router-dom'

interface ActInfoProps {
  act: Act
  isLoading: boolean
  isAdmin: boolean
  onUpdateClick: () => void
  onRemove: (id: number) => Promise<void>
}

const ActInfo: React.FC<ActInfoProps> = ({
  act,
  isLoading,
  isAdmin,
  onUpdateClick,
  onRemove
}) => (
  <Card
    title={act.number}
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
            title: 'Вы действительно хотите удалить акт?',
            placement: 'topRight'
          }}
          tooltipProps={{ title: 'Удалить' }}
          buttonProps={{
            type: 'primary',
            icon: <DeleteOutlined />,
            danger: true
          }}
          onConfirm={() => onRemove(act.id)}
        />
      </Space>
    )}
  >
    <Descriptions>
      <Descriptions.Item label="Идентификатор" span={3}>{act.id}</Descriptions.Item>

      <Descriptions.Item label="Номер">{act.number}</Descriptions.Item>

      <Descriptions.Item label="Инвентарный номер" span={2}>{act.eqInventoryNum}</Descriptions.Item>

      <Descriptions.Item label="Тип подписи">{act.signType.type}</Descriptions.Item>

      <Descriptions.Item label="Дата" span={2}>{formatDate(act.date)}</Descriptions.Item>

      <Descriptions.Item label="Соглашение">
        <Link to={`/agreements/${act.agreement.id}`}>{act.agreement.number}</Link>
      </Descriptions.Item>

      <Descriptions.Item label="СКЗИ">
        <Link to={`/skzi-units/${act.skziUnit.id}`}>{act.skziUnit.serialNum || act.skziUnit.id}</Link>
      </Descriptions.Item>
    </Descriptions>
  </Card>
)

export default ActInfo