import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Table } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import Hint from '../components/Hint'
import StatusTag from '../components/StatusTag'
import orgsStore from '../store/orgs/orgs.store'
import authStore from '../store/auth/auth.store'
import dialogStore from '../store/dialog/dialog.store'
import { Org } from '../store/orgs/orgs.types'
import { CreateOrgFormValues } from '../components/dialogs/CreateOrgDialog'
import { UpdateOrgFormValues } from '../components/dialogs/UpdateOrgDialog'
import getDelta from '../utils/getDelta'

const Orgs: React.FC = () => {
  const { orgs, isLoading, getOrgs, createOrg, updateOrg, setOrgs } = orgsStore
  const { isOperator } = authStore
  const { openDialog, closeDialog } = dialogStore

  const onCreate = async (values: CreateOrgFormValues) => {
    await createOrg(values)
    closeDialog()
  }

  const onUpdate = (org: Org) => async (values: UpdateOrgFormValues) => {
    const delta = getDelta(values, org)

    if(Object.keys(delta).length) {
      await updateOrg(org.id, delta)
    }

    closeDialog()
  }

  const openCreateDialog = () => openDialog({
    type: 'CreateOrg',
    title: 'Новый контрагент',
    props: {
      onFinish: onCreate
    }
  })

  const openUpdateDialog = (org: Org) => {
    openDialog({
      type: 'UpdateOrg',
      title: org.name,
      props: {
        org,
        onFinish: onUpdate(org)
      }
    })
  }

  useEffect(() => {
    getOrgs()

    return () => {
      setOrgs([])
    }
  }, [getOrgs, setOrgs])

  return (
    <Table
      dataSource={orgs}
      loading={isLoading}
      rowKey="id"
      bordered
      title={isOperator ? () => (
        <Hint
          tooltipProps={{ title: 'Добавить' }}
          buttonProps={{
            type: 'primary',
            shape: 'circle',
            icon: <PlusOutlined />,
            onClick: openCreateDialog
          }}
        />
      ) : undefined}
    >
      <Table.Column title="Наименование" dataIndex="name" key="name" />
      <Table.Column title="ИНН" dataIndex="inn" key="inn" />
      <Table.Column title="Работает" dataIndex="isWorks" key="isWorks" render={isWorks => <StatusTag value={isWorks} />} />
      {isOperator && (
        <Table.Column
          title="Действия"
          key="actions"
          width="0"
          render={(_, record: Org) => (
            <Hint
              tooltipProps={{ title: 'Редактировать' }}
              buttonProps={{
                type: 'primary',
                shape: 'circle',
                icon: <EditOutlined />,
                onClick: () => openUpdateDialog(record)
              }}
            />
          )}
        />
      )}
    </Table>
  )
}

export default observer(Orgs)