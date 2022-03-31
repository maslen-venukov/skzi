import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Drawer, Space, Table, Tooltip } from 'antd'
import { PlusOutlined, FileDoneOutlined, EditOutlined } from '@ant-design/icons'
import StatusTag from '../components/StatusTag'
import Hint from '../components/Hint'
import Loader from '../components/Loader'
import useTypedDispatch from '../hooks/useTypedDispatch'
import useTypedSelector from '../hooks/useTypedSelector'
import { selectAuth } from '../store/auth/auth.slice'
import { clearAgreements, selectAgreements } from '../store/agreements/agreements.slice'
import { clearAgreementTypes, selectAgreementTypes } from '../store/agreementTypes/agreementTypes.slice'
import { getAgreements } from '../store/agreements/agreements.thunks'
import { getAgreementTypes } from '../store/agreementTypes/agreementTypes.thunks'
import useBoolean from '../hooks/useBoolean'
import isRoleMatch from '../utils/isRoleMatch'
import { formatDate } from '../utils/format'
import { Agreement } from '../store/agreements/agreements.types'
import { Type } from '../interfaces/Type'
import { Roles } from '../enums/Roles'

const AgreementsForm = React.lazy(() => import('../components/agreements/AgreementsForm'))

const Agreements: React.FC = () => {
  const [currentAgreement, setCurrentAgreement] = useState<Agreement | null>(null)
  const dispatch = useTypedDispatch()
  const { user } = useTypedSelector(selectAuth)
  const { isLoading: isAgreementsLoading, agreements } = useTypedSelector(selectAgreements)
  const { isLoading: isTypesLoading } = useTypedSelector(selectAgreementTypes)
  const navigate = useNavigate()
  const createDrawerVisible = useBoolean()
  const updateDrawerVisible = useBoolean()

  const isOperator = useMemo(() => (
    user && isRoleMatch(user.role.role, Roles.Operator)
  ), [user])

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
    dispatch(getAgreements())

    return () => {
      dispatch(clearAgreements())
      dispatch(clearAgreementTypes())
    }
  }, [dispatch])

  useEffect(() => {
    if(isOperator) {
      dispatch(getAgreementTypes())
    }
  }, [isOperator, dispatch])

  return (
    <>
      <Table
        dataSource={agreements}
        loading={isAgreementsLoading || isTypesLoading}
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
                <Hint
                  tooltipProps={{ title: 'Редактировать' }}
                  buttonProps={{
                    type: 'primary',
                    shape: 'circle',
                    icon: <EditOutlined />,
                    onClick: () => openUpdateDrawer(record)
                  }}
                />

                {record.parentId && (
                  <Hint
                    tooltipProps={{ title: 'Родительское соглашение' }}
                    buttonProps={{
                      type: 'primary',
                      shape: 'circle',
                      icon: <FileDoneOutlined />,
                      onClick: () => navigate(`/agreements/${record.id}`)
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
          <AgreementsForm
            submitText="Добавить"
            onFinish={values => console.log(values)}
          />
        </Suspense>
      </Drawer>

      <Drawer
        title={currentAgreement?.number}
        visible={updateDrawerVisible.value}
        onClose={closeUpdateDrawer}
      >
        <Suspense fallback={<Loader />}>
          <AgreementsForm
            agreement={currentAgreement}
            submitText="Сохранить"
            onFinish={values => console.log(values)}
          />
        </Suspense>
      </Drawer>
    </>
  )
}

export default Agreements