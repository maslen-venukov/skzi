import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Descriptions, Space } from 'antd'
import { FileDoneOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Hint from '../Hint'
import StatusTag from '../StatusTag'
import Confirm from '../Confirm'
import { formatDate } from '../../utils/format'
import { Agreement } from '../../store/agreements/agreements.types'

interface AgreementInfoProps {
  agreement: Agreement
  isLoading: boolean
  isAdmin: boolean
  onUpdateClick: () => void
  onParentClick: () => void
  onRemove: (id: number) => Promise<void>
}

const AgreementInfo: React.FC<AgreementInfoProps> = ({
  agreement,
  isAdmin,
  isLoading,
  onParentClick,
  onUpdateClick,
  onRemove
}) => (
  <Card
    title={agreement.number}
    loading={isLoading}
    extra={(
      <Space>
        {agreement.parentId && (
          <Hint
            tooltipProps={{ title: 'Родительское соглашение' }}
            buttonProps={{
              type: 'primary',
              shape: 'circle',
              icon: <FileDoneOutlined />,
              onClick: onParentClick
            }}
          />
        )}

        {isAdmin && (
          <>
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
                title: 'Вы действительно хотите удалить соглашение?',
                placement: 'topRight'
              }}
              tooltipProps={{ title: 'Удалить' }}
              buttonProps={{
                type: 'primary',
                icon: <DeleteOutlined />,
                danger: true
              }}
              onConfirm={() => onRemove(agreement.id)}
            />
          </>
        )}
      </Space>
    )}
  >
    <Descriptions>
      <Descriptions.Item label="Идентификатор" span={3}>{agreement.id}</Descriptions.Item>

      <Descriptions.Item label="Номер" span={3}>{agreement.number}</Descriptions.Item>

      <Descriptions.Item label="Активно" span={3}>
        <StatusTag value={agreement.isActive} />
      </Descriptions.Item>

      <Descriptions.Item label="Тип" span={3}>{agreement.type.type}</Descriptions.Item>

      <Descriptions.Item label="Дата начала">{formatDate(agreement.beginDate)}</Descriptions.Item>

      <Descriptions.Item label="Дата окончания">{formatDate(agreement.endDate)}</Descriptions.Item>

      <Descriptions.Item label="Дата расторжения">{formatDate(agreement.terminationDate)}</Descriptions.Item>

      <Descriptions.Item label="Узел">
        <Link to={`/orgs/${agreement.contractorNode.id}`}>{agreement.contractorNode.name}</Link>
      </Descriptions.Item>

      <Descriptions.Item label="Сегмент" span={2}>
        <Link to={`/orgs/${agreement.contractorSegment?.id}`}>{agreement.contractorSegment?.name}</Link>
      </Descriptions.Item>

      <Descriptions.Item label="Добавил">{agreement.addUser.realName}</Descriptions.Item>

      <Descriptions.Item label="Дата добавления">{formatDate(agreement.addDate)}</Descriptions.Item>
    </Descriptions>
  </Card>
)

export default AgreementInfo