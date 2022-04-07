import React, { useMemo } from 'react'
import { Space, Table, Typography } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Hint from './Hint'
import authStore from '../store/auth/auth.store'
import isRoleMatch from '../utils/isRoleMatch'
import { Type } from '../interfaces/type.interface'
import { Roles } from '../store/roles/roles.types'

export interface TypesTableProps {
  title: string
  types: Type[]
  isLoading: boolean
}

const TypesTable: React.FC<TypesTableProps> = ({ title, types, isLoading }) => {
  const { user } = authStore

  const isAdmin = useMemo(() => (
    user && isRoleMatch(user.role.role, Roles.Admin)
  ), [user])

  return (
    <Table
      dataSource={types}
      loading={isLoading}
      pagination={false}
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
      rowKey="id"
      bordered
    >
      <Table.Column title="ID" dataIndex="id" key="id" width="5%" />
      <Table.Column title="Название" dataIndex="type" key="type" />
      {isAdmin && (
        <Table.Column
          title="Действия"
          key="actions"
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

              <Hint
                tooltipProps={{ title: 'Удалить' }}
                buttonProps={{
                  type: 'primary',
                  shape: 'circle',
                  danger: true,
                  icon: <DeleteOutlined />,
                  onClick: () => console.log(record.id)
                }}
              />
            </Space>
          )}
        />
      )}
    </Table>
  )
}

export default TypesTable