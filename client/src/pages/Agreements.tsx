import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Space, Table, Tooltip } from 'antd'
import { PlusOutlined, FileDoneOutlined, EditOutlined } from '@ant-design/icons'
import StatusTag from '../components/StatusTag'
import Hint from '../components/Hint'
import authStore from '../store/auth/auth.store'
import agreementsStore from '../store/agreements/agreements.store'
import agreementTypesStore from '../store/agreement-types/agreement-types.store'
import orgsStore from '../store/orgs/orgs.store'
import dialogStore from '../store/dialog/dialog.store'
import getDelta from '../utils/getDelta'
import nullify from '../utils/nullify'
import { formatDate } from '../utils/format'
import { Agreement } from '../store/agreements/agreements.types'
import { Type } from '../interfaces/type.interface'
import { CreateAgreementFormValues } from '../components/dialogs/CreateAgreementDialog'
import { UpdateAgreementFormValues } from '../components/dialogs/UpdateAgreementDialog'

const Agreements: React.FC = () => {
  const { isAdmin, isOperator } = authStore
  const {
    agreements,
    isLoading: isAgreementsLoading,
    getAgreements,
    createAgreement,
    updateAgreement,
    setAgreements
  } = agreementsStore
  const { isLoading: isTypesLoading, getAgreementTypes, setAgreementTypes } = agreementTypesStore
  const { isLoading: isOrgsLoading, getOrgs, setOrgs } = orgsStore
  const { openDialog, closeDialog } = dialogStore
  const navigate = useNavigate()

  const onCreate = async (values: CreateAgreementFormValues) => {
    await createAgreement({
      ...values,
      beginDate: values.beginDate.toDate(),
      endDate: values.endDate?.toDate(),
      parentId: Number(values.parentId)
    })
    closeDialog()
  }

  const onUpdate = (agreement: Agreement) => async (values: UpdateAgreementFormValues) => {
    const delta = getDelta(
      {
        ...values,
        beginDate: values.beginDate.toJSON(),
        endDate: values.endDate?.toJSON(),
        terminationDate: values.terminationDate?.toJSON()
      },
      {
        ...agreement,
        typeId: agreement.type.id,
        contractorNodeId: agreement.contractorNode.id,
        contractorSegmentId: agreement.contractorSegment?.id,
        parentId: agreement.parentId?.toString()
      }
    )

    if(Object.keys(delta).length) {
      await updateAgreement(agreement.id, nullify(delta))
    }

    closeDialog()
  }

  const openCreateDialog = () => openDialog({
    type: 'CreateAgreement',
    title: 'Новое соглашение',
    props: {
      onFinish: onCreate
    }
  })

  const openUpdateDialog = (agreement: Agreement) => {
    openDialog({
      type: 'UpdateAgreement',
      title: agreement.number,
      props: {
        agreement,
        onFinish: onUpdate(agreement)
      }
    })
  }

  useEffect(() => {
    Promise.all([
      getAgreements(),
      ...isOperator ? [
        getAgreementTypes(),
        getOrgs()
      ] : []
    ])

    return () => {
      setAgreements([])
      setAgreementTypes([])
      setOrgs([])
    }
  }, [
    isOperator,
    getAgreements, getAgreementTypes, getOrgs,
    setAgreements, setAgreementTypes, setOrgs
  ])

  return (
    <Table
      dataSource={agreements}
      loading={isAgreementsLoading || isTypesLoading || isOrgsLoading}
      rowKey="id"
      bordered
      onRow={record => ({
        onDoubleClick: () => navigate(`/agreements/${record.id}`)
      })}
      {...isOperator ? {
        title: () => (
          <Hint
            tooltipProps={{ title: 'Добавить' }}
            buttonProps={{
              type: 'primary',
              shape: 'circle',
              icon: <PlusOutlined />,
              onClick: openCreateDialog
            }}
          />
        )
      } : {}}
    >
      <Table.Column title="Номер" dataIndex="number" key="number" />
      <Table.Column title="Активно" dataIndex="isActive" key="isActive" render={value => <StatusTag value={value} />} />
      <Table.Column
        title="Тип"
        dataIndex="type"
        key="type"
        ellipsis={{ showTitle: false }}
        render={(value: Type) => <Tooltip title={value.type} placement="topLeft">{value.type}</Tooltip>}
      />
      <Table.Column title="Дата начала" dataIndex="beginDate" key="beginDate" render={formatDate} />
      <Table.Column title="Дата окончания" dataIndex="endDate" key="endDate" render={value => value && formatDate(value)} />
      <Table.Column title="Дата расторжения" dataIndex="terminationDate" key="terminationDate" render={value => value && formatDate(value)} />
      <Table.Column title="Узел" dataIndex="contractorNode" key="contractorNode" render={value => value.name} />
      <Table.Column title="Сегмент" dataIndex="contractorSegment" key="contractorSegment" render={value => value?.name} />
      <Table.Column
          title="Действия"
          key="actions"
          render={(_, record: Agreement) => (
            <Space>
              {isAdmin && (
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

              {record.parentId && (
                <Hint
                  tooltipProps={{ title: 'Родительское соглашение' }}
                  buttonProps={{
                    type: 'primary',
                    shape: 'circle',
                    icon: <FileDoneOutlined />,
                    onClick: () => navigate(`/agreements/${record.parentId}`)
                  }}
                />
              )}
            </Space>
          )}
        />
    </Table>
  )
}

export default observer(Agreements)