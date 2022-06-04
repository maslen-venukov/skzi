import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'
import { Empty } from 'antd'
import ActInfo from '../components/acts/ActInfo'
import Loader from '../components/Loader'
import actsStore from '../store/acts/acts.store'
import authStore from '../store/auth/auth.store'
import dialogStore from '../store/dialog/dialog.store'
import nullify from '../utils/nullify'
import getDelta from '../utils/getDelta'
import { Act } from '../store/acts/acts.types'
import { UpdateActFormValues } from '../components/dialogs/UpdateActDialog'
import signTypesStore from '../store/sign-types/sign-types.store'

const Act: React.FC = () => {
  const { id } = useParams()
  const [isFirstLoading, setFirstLoading] = useState(false)
  const { act, isLoading, getAct, updateAct, removeAct, setAct } = actsStore
  const { getSignTypes, setSignTypes } = signTypesStore
  const { isAdmin } = authStore
  const { openDialog, closeDialog } = dialogStore
  const navigate = useNavigate()

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

  const openUpdateDialog = () => {
    if(!act) return

    openDialog({
      type: 'UpdateAct',
      title: act.number,
      props: {
        act,
        onFinish: onUpdate(act)
      }
    })
  }

  const onRemove = async (id: number) => {
    removeAct(id).then(() => navigate('/acts'))
  }

  useEffect(() => {
    setFirstLoading(true)

    Promise.all([
      getAct(Number(id)),
      ...isAdmin ? [getSignTypes()] : []
    ]).then(() => setFirstLoading(false))

    return () => {
      setAct(null)
      setSignTypes([])
    }
  }, [isAdmin])

  if(isFirstLoading) {
    return <Loader />
  }

  if(!act) {
    return <Empty />
  }

  return (
    <div className="vertical-space">
      <ActInfo
        act={act}
        isLoading={isLoading}
        isAdmin={isAdmin}
        onUpdateClick={openUpdateDialog}
        onRemove={onRemove}
      />
    </div>
  )
}

export default observer(Act)