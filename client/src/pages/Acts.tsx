import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Table, Pagination, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import Hint from '../components/Hint'
import Confirm from '../components/Confirm'
import actsStore from '../store/acts/acts.store'
import signTypesStore from '../store/sign-types/sign-types.store'
import authStore from '../store/auth/auth.store'
import dialogStore from '../store/dialog/dialog.store'
import usePagination from '../hooks/usePagination'
import nullify from '../utils/nullify'
import getDelta from '../utils/getDelta'
import { formatDate } from '../utils/format'
import { Act } from '../store/acts/acts.types'
import { SkziUnit } from '../store/skzi-units/skzi-units.types'
import { Type } from '../interfaces/type.interface'
import { Agreement } from '../store/agreements/agreements.types'
import { CreateActFormValues } from '../components/dialogs/CreateActDialog'
import { UpdateActFormValues } from '../components/dialogs/UpdateActDialog'

const Acts: React.FC = () => {
  const {
    acts, isLoading, total,
    getActs, createAct, updateAct, removeAct,
    setActs, setTotal
  } = actsStore
  const { getSignTypes, setSignTypes } = signTypesStore
  const { isAdmin, isOperator } = authStore
  const { openDialog, closeDialog } = dialogStore
  const navigate = useNavigate()
  const pagination = usePagination({ fetch: getActs })

  const onCreate = async (values: CreateActFormValues) => {
    createAct({
      ...values,
      date: values.date.toDate(),
      agreementId: Number(values.agreementId),
      skziUnitId: Number(values.skziUnitId)
    }).then(act => {
      navigate(`/acts/${act.id}`)
      closeDialog()
    })
  }

  const onUpdate = (act: Act) => async (values: UpdateActFormValues) => {
    const delta = nullify(getDelta(
      {
        ...values,
        date: values.date.toJSON()
      },
      {
        ...act,
        agreementId: act.agreement.id.toString(),
        skziUnitId: act.skziUnit.id.toString(),
        signTypeId: act.signType.id
      }
    ))

    if(Object.keys(delta).length) {
      await updateAct(act.id, delta)
    }

    closeDialog()
  }

  const onRemove = (id: number) => {
    removeAct(id).then(pagination.fetch)
  }

  const openCreateDialog = () => openDialog({
    type: 'CreateAct',
    title: 'Новый акт',
    props: {
      onFinish: onCreate
    }
  })

  const openUpdateDialog = (act: Act) => {
    openDialog({
      type: 'UpdateAct',
      title: act.number,
      props: {
        act,
        onFinish: onUpdate(act)
      }
    })
  }

  useEffect(() => {
    if(isOperator) {
      getSignTypes()
    }

    return () => {
      setSignTypes([])
      setActs([])
      setTotal(0)
    }
  }, [isOperator])

  return (
    <>
      <Table
        dataSource={acts}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        bordered
        onRow={record => ({
          onDoubleClick: () => navigate(`/acts/${record.id}`)
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
        <Table.Column title="Дата" dataIndex="date" key="date" render={formatDate} />
        <Table.Column
          title="Соглашение"
          dataIndex="agreement"
          key="agreement"
          render={({ id, number }: Agreement) => <Link to={`/agreements/${id}`}>{number}</Link>}
        />
        <Table.Column
          title="СКЗИ"
          dataIndex="skziUnit"
          key="skziUnit"
          render={({ id, serialNum }: SkziUnit) => <Link to={`/skzi-units/${id}`}>{serialNum || id}</Link>}
        />
        <Table.Column title="Тип подписи" dataIndex="signType" key="signType" render={({ type }: Type) => type} />
        <Table.Column title="Инвентарный номер" dataIndex="eqInventoryNum" key="eqInventoryNum" />

        {isAdmin && (
          <Table.Column
            title="Действия"
            key="actions"
            width="0"
            render={(_, record: Act) => (
              <Space>
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
                    title: 'Вы действительно хотите удалить акт?',
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
              </Space>
            )}
          />
        )}
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

export default observer(Acts)