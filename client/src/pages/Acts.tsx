import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Table, Pagination, Space, Popover, Row, Checkbox, Button } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import Hint from '../components/Hint'
import Confirm from '../components/Confirm'
import actsStore from '../store/acts/acts.store'
import signTypesStore from '../store/sign-types/sign-types.store'
import authStore from '../store/auth/auth.store'
import dialogStore from '../store/dialog/dialog.store'
import usePagination from '../hooks/usePagination'
import useColumns from '../hooks/useColumns'
import useSearchColumn from '../hooks/useSearchColumn'
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
  const { getColumnSearchProps } = useSearchColumn<Act>()

  const { columns, viewColumns, getCheckboxProps } = useColumns<Act>([
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
      ...getColumnSearchProps('number')
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: formatDate
    },
    {
      title: 'Соглашение',
      dataIndex: 'agreement',
      key: 'agreement',
      render: ({ id, number }: Agreement) => <Link to={`/agreements/${id}`}>{number}</Link>
    },
    {
      title: 'СКЗИ',
      dataIndex: 'skziUnit',
      key: 'skziUnit',
      render: ({ id, serialNum }: SkziUnit) => <Link to={`/skzi-units/${id}`}>{serialNum || id}</Link>
    },
    {
      title: 'Тип подписи',
      dataIndex: 'signType',
      key: 'signType',
      render: ({ type }: Type) => type
    },
    {
      title: 'Инвентарный номер',
      dataIndex: 'eqInventoryNum',
      key: 'eqInventoryNum',
      ...getColumnSearchProps('eqInventoryNum')
    },
    ...isAdmin ? [{
      title: 'Действия',
      key: 'actions',
      width: '0',
      render: (_: unknown, record: Act) => (
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
      )
    }] : []
  ])

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
        columns={viewColumns}
        dataSource={acts}
        loading={isLoading}
        pagination={false}
        scroll={{ x: 600 }}
        rowKey="id"
        bordered
        onRow={record => ({
          onDoubleClick: () => navigate(`/acts/${record.id}`)
        })}
        title={() => (
          <Space>
            <Popover
              placement="bottomLeft"
              content={
                <>
                  {columns.map(column => (
                    <Row key={column.key}>
                      <Checkbox {...getCheckboxProps(column.key as keyof Act)}>
                        {column.title as string}
                      </Checkbox>
                    </Row>
                  ))}
                </>
              }
            >
              <Button icon={<UnorderedListOutlined />} />
            </Popover>

            {isOperator && (
              <Hint
                tooltipProps={{ title: 'Добавить' }}
                buttonProps={{
                  type: 'primary',
                  shape: 'circle',
                  icon: <PlusOutlined />,
                  onClick: openCreateDialog
                }}
              />
            )}
          </Space>
        )}
      />

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