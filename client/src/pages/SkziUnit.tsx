import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { Empty } from 'antd'
import Loader from '../components/Loader'
import SkziInfo from '../components/skzi/SkziInfo'
import skziUnitsStore from '../store/skzi-units/skzi-units.store'
import agreementTypesStore from '../store/agreement-types/agreement-types.store'
import orgsStore from '../store/orgs/orgs.store'
import authStore from '../store/auth/auth.store'
import dialogStore from '../store/dialog/dialog.store'
import nullify from '../utils/nullify'
import getDelta from '../utils/getDelta'
import { UpdateSkziUnitFormValues } from '../components/dialogs/UpdateSkziUnitDialog'

const SkziUnit: React.FC = () => {
  const { id } = useParams()
  const {
    skziUnit,
    isLoading,
    getSkziUnit,
    updateSkziUnit,
    setSkziUnit
  } = skziUnitsStore
  const { getAgreementTypes, setAgreementTypes } = agreementTypesStore
  const { getOrgs, setOrgs } = orgsStore
  const { isAdmin } = authStore
  const { openDialog, closeDialog } = dialogStore

  const onUpdate = async (values: UpdateSkziUnitFormValues) => {
    if(!skziUnit) return

    const delta = nullify(getDelta(values, {
      ...skziUnit,
      vipnetLanId: skziUnit.vipnetLan.id,
      skziTypeId: skziUnit.skziType.id,
      platformTypeId: skziUnit.platformType?.id,
      skziOwnerId: skziUnit.skziOwner?.id,
      agreementId: skziUnit.agreement?.id.toString()
    }))

    if(Object.keys(delta).length) {
      await updateSkziUnit(skziUnit.id, delta)
    }

    closeDialog()
  }

  const openUpdateDialog = () => {
    if(!skziUnit) return

    openDialog({
      type: 'UpdateSkziUnit',
      title: skziUnit.serialNum,
      props: {
        skziUnit,
        onFinish: onUpdate
      }
    })
  }

  useEffect(() => {
    getSkziUnit(Number(id))

    return () => {
      setSkziUnit(null)
      setAgreementTypes([])
      setOrgs([])
    }
  }, [id, getSkziUnit, setSkziUnit, setAgreementTypes, setOrgs])

  useEffect(() => {
    if(!skziUnit?.agreement) return

    Promise.all([
      getAgreementTypes(),
      getOrgs()
    ])
  }, [skziUnit, getAgreementTypes, getOrgs])

  if(isLoading) {
    return <Loader />
  }

  if(!skziUnit) {
    return <Empty />
  }

  return (
    <div className="vertical-space">
      <SkziInfo
        skziUnit={skziUnit}
        isAdmin={isAdmin}
        onUpdateClick={openUpdateDialog}
      />
    </div>
  )
}

export default observer(SkziUnit)