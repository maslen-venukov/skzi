import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Drawer, Space, Table, Tooltip } from 'antd'
import { PlusOutlined, FileDoneOutlined, EditOutlined } from '@ant-design/icons'
import StatusTag from '../components/StatusTag'
import Hint from '../components/Hint'
import Loader from '../components/Loader'
import authStore from '../store/auth/auth.store'
import agreementsStore from '../store/agreements/agreements.store'
import agreementTypesStore from '../store/agreement-types/agreement-types.store'
import orgsStore from '../store/orgs/orgs.store'
import useBoolean from '../hooks/useBoolean'
import isRoleMatch from '../utils/isRoleMatch'
import getDelta from '../utils/getDelta'
import nullify from '../utils/nullify'
import { formatDate } from '../utils/format'
import { Agreement } from '../store/agreements/agreements.types'
import { Type } from '../interfaces/type.interface'
import { Roles } from '../enums/roles.enum'
import { CreateAgreementFormValues } from '../components/agreements/CreateAgreementForm'
import { UpdateAgreementFormValues } from '../components/agreements/UpdateAgreementForm'

const CreateAgreementForm = React.lazy(() => import('../components/agreements/CreateAgreementForm'))
const UpdateAgreementForm = React.lazy(() => import('../components/agreements/UpdateAgreementForm'))

const Agreements: React.FC = () => {
  const [currentAgreement, setCurrentAgreement] = useState<Agreement | null>(null)
  const { user } = authStore
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
  const navigate = useNavigate()
  const createDrawerVisible = useBoolean()
  const updateDrawerVisible = useBoolean()

  const isAdmin = useMemo(() => (
    user && isRoleMatch(user.role.role, Roles.Admin)
  ), [user])

  const isOperator = useMemo(() => (
    user && isRoleMatch(user.role.role, Roles.Operator)
  ), [user])

  const onCreate = async (values: CreateAgreementFormValues) => {
    await createAgreement({
      ...values,
      beginDate: values.beginDate.toDate(),
      endDate: values.endDate?.toDate(),
      parentId: Number(values.parentId)
    })
    createDrawerVisible.setFalse()
  }

  const onUpdate = async (values: UpdateAgreementFormValues) => {
    if(!currentAgreement) return

    const delta = getDelta(
      {
        ...values,
        beginDate: values.beginDate.toJSON(),
        endDate: values.endDate?.toJSON(),
        terminationDate: values.terminationDate?.toJSON()
      },
      {
        ...currentAgreement,
        typeId: currentAgreement.type.id,
        contractorNodeId: currentAgreement.contractorNode.id,
        contractorSegmentId: currentAgreement.contractorSegment?.id,
        parentId: currentAgreement.parentId?.toString()
      }
    )

    if(Object.keys(delta).length) {
      await updateAgreement(currentAgreement.id, nullify(delta))
    }

    updateDrawerVisible.setFalse()
  }

  const openUpdateDrawer = (agreement: Agreement) => {
    setCurrentAgreement(agreement)
    updateDrawerVisible.setTrue()
  }

  const closeUpdateDrawer = () => {
    updateDrawerVisible.setFalse()
    setTimeout(() => {
      setCurrentAgreement(null)
    }, 300)
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
    <>
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
                onClick: createDrawerVisible.setTrue
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
                      onClick: () => openUpdateDrawer(record)
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

      <Drawer
        title="Новое соглашение"
        visible={createDrawerVisible.value}
        onClose={createDrawerVisible.setFalse}
      >
        <Suspense fallback={<Loader />}>
          <CreateAgreementForm onFinish={onCreate} />
        </Suspense>
      </Drawer>

      <Drawer
        title={currentAgreement?.number}
        visible={updateDrawerVisible.value}
        onClose={closeUpdateDrawer}
      >
        <Suspense fallback={<Loader />}>
          <UpdateAgreementForm
            agreement={currentAgreement}
            onFinish={onUpdate}
          />
        </Suspense>
      </Drawer>
    </>
  )
}

export default observer(Agreements)