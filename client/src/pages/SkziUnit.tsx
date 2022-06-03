import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { Empty } from 'antd'
import Loader from '../components/Loader'
import SkziInfo from '../components/skzi/SkziInfo'
import SkziActs from '../components/skzi/SkziActs'
import skziUnitsStore from '../store/skzi-units/skzi-units.store'
import actsStore from '../store/acts/acts.store'
import vipnetLansStore from '../store/vipnet-lans/vipnet-lans.store'
import skziTypesStore from '../store/skzi-types/skzi-types.store'
import platformTypesStore from '../store/platform-types/platform-types.store'
import orgsStore from '../store/orgs/orgs.store'
import authStore from '../store/auth/auth.store'
import dialogStore from '../store/dialog/dialog.store'
import nullify from '../utils/nullify'
import getDelta from '../utils/getDelta'
import { UpdateSkziUnitFormValues } from '../components/dialogs/UpdateSkziUnitDialog'

const SkziUnit: React.FC = () => {
  const { id } = useParams()
  const {
    skziUnit, isLoading,
    getSkziUnit, updateSkziUnit, setSkziUnit
  } = skziUnitsStore
  const { acts, isLoading: isActsLoading, getSkziUnitActs, setActs } = actsStore
  const { getVipnetLans, setVipnetLans } = vipnetLansStore
  const { getSkziTypes, setSkziTypes } = skziTypesStore
  const { getPlatformTypes, setPlatformTypes } = platformTypesStore
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
    const skziUnitId = Number(id)

    Promise.all([
      getSkziUnit(skziUnitId),
      getSkziUnitActs(skziUnitId),
      ...isAdmin ? [
        getVipnetLans(),
        getSkziTypes(),
        getPlatformTypes(),
        getOrgs(),
      ] : []
    ])

    return () => {
      setSkziUnit(null)
      setActs([])
      setVipnetLans([])
      setSkziTypes([])
      setPlatformTypes([])
      setOrgs([])
    }
  }, [
    id, isAdmin,
    getSkziUnit, getSkziUnitActs, getVipnetLans, getSkziTypes, getPlatformTypes, getOrgs,
    setSkziUnit, setActs, setVipnetLans, setSkziTypes, setPlatformTypes, setOrgs
  ])

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

      <SkziActs
        acts={acts}
        isLoading={isActsLoading}
      />
    </div>
  )
}

export default observer(SkziUnit)