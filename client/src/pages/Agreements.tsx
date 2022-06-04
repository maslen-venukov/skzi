import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Pagination, Space, Table } from 'antd'
import { PlusOutlined, FileDoneOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import StatusTag from '../components/StatusTag'
import Hint from '../components/Hint'
import Confirm from '../components/Confirm'
import authStore from '../store/auth/auth.store'
import agreementsStore from '../store/agreements/agreements.store'
import agreementTypesStore from '../store/agreement-types/agreement-types.store'
import orgsStore from '../store/orgs/orgs.store'
import dialogStore from '../store/dialog/dialog.store'
import usePagination from '../hooks/usePagination'
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
    agreements, isLoading, total,
    getAgreements, createAgreement, updateAgreement, removeAgreement,
    setAgreements, setTotal
  } = agreementsStore
  const { getAgreementTypes, setAgreementTypes } = agreementTypesStore
  const { getOrgs, setOrgs } = orgsStore
  const { openDialog, closeDialog } = dialogStore
  const navigate = useNavigate()
  const pagination = usePagination({ fetch: getAgreements })

  const onCreate = async (values: CreateAgreementFormValues) => {
    createAgreement({
      ...values,
      beginDate: values.beginDate.toDate(),
      endDate: values.endDate?.toDate(),
      parentId: Number(values.parentId) || undefined
    }).then(agreement => {
      navigate(`/agreements/${agreement.id}`)
      closeDialog()
    })
  }

  const onUpdate = (agreement: Agreement) => async (values: UpdateAgreementFormValues) => {
    const delta = nullify(getDelta(
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
    ))

    if(Object.keys(delta).length) {
      await updateAgreement(agreement.id, delta)
    }

    closeDialog()
  }

  const onRemove = async (id: number) => {
    removeAgreement(id).then(pagination.fetch)
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
    if(isOperator) {
      Promise.all([
        getAgreementTypes(),
        getOrgs()
      ])
    }

    return () => {
      setAgreements([])
      setAgreementTypes([])
      setOrgs([])
      setTotal(0)
    }
  }, [
    isOperator,
    getAgreementTypes, getOrgs,
    setAgreements, setAgreementTypes, setOrgs, setTotal
  ])

  return (
    <>
      <Table
        dataSource={agreements}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        bordered
        onRow={record => ({
          onDoubleClick: () => navigate(`/agreements/${record.id}`)
        })}
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
        <Table.Column title="Номер" dataIndex="number" key="number" />
        <Table.Column title="Активно" dataIndex="isActive" key="isActive" render={isActive => <StatusTag value={isActive} />} />
        <Table.Column title="Тип" dataIndex="type" key="type" render={({ type }: Type) => type} />
        <Table.Column title="Дата начала" dataIndex="beginDate" key="beginDate" render={formatDate} />
        <Table.Column title="Дата окончания" dataIndex="endDate" key="endDate" render={formatDate} />
        <Table.Column title="Дата расторжения" dataIndex="terminationDate" key="terminationDate" render={formatDate} />
        <Table.Column title="Узел" dataIndex="contractorNode" key="contractorNode" render={org => org.name} />
        <Table.Column title="Сегмент" dataIndex="contractorSegment" key="contractorSegment" render={org => org?.name} />
        <Table.Column
          title="Действия"
          key="actions"
          width="0"
          render={(_, record: Agreement) => (
            <Space>
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

              {isAdmin && (
                <>
                  <Hint
                    tooltipProps={{ title: 'Редактировать' }}
                    buttonProps={{
                      type: 'primary',
                      shape: 'circle',
                      icon: <EditOutlined />,
                      onClick: () => openUpdateDialog(record)
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
                    onConfirm={() => onRemove(record.id)}
                  />
                </>
              )}
            </Space>
          )}
        />
      </Table>

      <Pagination
        {...pagination}
        total={total}
        className="pagination"
        size="small"
      />
    </>
  )
}

export default observer(Agreements)