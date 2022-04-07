import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Table } from 'antd'
import vipnetLansStore from '../store/vipnet-lans/vipnet-lans.store'

const VipnetLans: React.FC = () => {
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
      title={() => 'Сети ViPNet'}
      rowKey="id"
      bordered
    >
      <Table.Column title="ID" dataIndex="id" key="id" />
      <Table.Column title="Номер" dataIndex="lanNum" key="lanNum" />
      <Table.Column title="Название" dataIndex="lanName" key="lanName" />
    </Table>
  )
}

export default observer(VipnetLans)