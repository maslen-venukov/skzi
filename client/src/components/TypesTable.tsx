import React from 'react'
import { Space, Table, Typography } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Hint from './Hint'
import Confirm from './Confirm'
import authStore from '../store/auth/auth.store'
import { Type } from '../interfaces/type.interface'

export interface TypesTableProps {
  title: string
  types: Type[]
  isLoading: boolean
}

const TypesTable: React.FC<TypesTableProps> = ({ title, types, isLoading }) => {
  const { isAdmin } = authStore

  return (
    <Table
      dataSource={types}
      loading={isLoading}
      pagination={false}
      rowKey="id"
      bordered
      title={() => (
        <Space>
          {isAdmin && (
            <Hint
              tooltipProps={{ title: 'Добавить' }}
              buttonProps={{
                type: 'primary',
                shape: 'circle',
                icon: <PlusOutlined />
              }}
            />
          )}

          <Typography.Text>{title}</Typography.Text>
        </Space>
      )}
    >
      <Table.Column title="ID" dataIndex="id" key="id" width="0" />
      <Table.Column title="Название" dataIndex="type" key="type" />
      {isAdmin && (
        <Table.Column
          title="Действия"
          key="actions"
          width="0"
          render={(_, record: Type) => (
            <Space>
              <Hint
                tooltipProps={{ title: 'Редактировать' }}
                buttonProps={{
                  type: 'primary',
                  shape: 'circle',
                  icon: <EditOutlined />,
                  onClick: () => console.log(record.id)
                }}
              />

              <Confirm
                popconfirmProps={{
                  title: 'Вы действительно хотите удалить тип?',
                  placement: 'topRight'
                }}
                tooltipProps={{ title: 'Удалить' }}
                buttonProps={{
                  type: 'primary',
                  icon: <DeleteOutlined />,
                  danger: true
                }}
                onConfirm={() => console.log(record.id)}
              />
            </Space>
          )}
        />
      )}
    </Table>
  )
}

export default TypesTable