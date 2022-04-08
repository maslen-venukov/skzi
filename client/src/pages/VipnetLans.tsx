import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Space, Table, Typography } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Hint from '../components/Hint'
import authStore from '../store/auth/auth.store'
import vipnetLansStore from '../store/vipnet-lans/vipnet-lans.store'
import { Type } from '../interfaces/type.interface'

const VipnetLans: React.FC = () => {
  const { isAdmin } = authStore
  const { vipnetLans, isLoading, getVipnetLans, setVipnetLans } = vipnetLansStore

  useEffect(() => {
    getVipnetLans()

    return () => {
      setVipnetLans([])
    }
  }, [getVipnetLans, setVipnetLans])

  return (
    <Table
      dataSource={vipnetLans}
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

          <Typography.Text>Сети ViPNet</Typography.Text>
        </Space>
      )}
      rowKey="id"
      bordered
    >
      <Table.Column title="ID" dataIndex="id" key="id" width="0" />
      <Table.Column title="Номер" dataIndex="lanNum" key="lanNum" width="0" />
      <Table.Column title="Название" dataIndex="lanName" key="lanName" />
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

export default observer(VipnetLans)