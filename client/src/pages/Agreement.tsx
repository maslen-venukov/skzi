import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Empty } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import AgreementInfo from '../components/agreements/AgreementInfo'
import AgreementSkziUnits from '../components/agreements/AgreementSkziUnits'
import AgreementActs from '../components/agreements/AgreementActs'
import skziUnitsStore from '../store/skzi-units/skzi-units.store'
import agreementsStore from '../store/agreements/agreements.store'
import actsStore from '../store/acts/acts.store'
import agreementTypesStore from '../store/agreement-types/agreement-types.store'
import orgsStore from '../store/orgs/orgs.store'
import authStore from '../store/auth/auth.store'
import dialogStore from '../store/dialog/dialog.store'
import nullify from '../utils/nullify'
import getDelta from '../utils/getDelta'
import { UpdateAgreementFormValues } from '../components/dialogs/UpdateAgreementDialog'

const Agreement: React.FC = () => {
  const [isFirstLoading, setFirstLoading] = useState(false)
  const { id } = useParams()
  const {
    agreement, isLoading,
    getAgreement, updateAgreement, removeAgreement,
    setAgreement
  } = agreementsStore
  const {
    skziUnits, isLoading: isSkziUnitsLoading,
    getAgreementSkziUnits, setSkziUnits
  } = skziUnitsStore
  const {
    acts, isLoading: isActsLoading,
    getAgreementActs, setActs
  } = actsStore
  const { getAgreementTypes, setAgreementTypes } = agreementTypesStore
  const { getOrgs, setOrgs } = orgsStore
  const { isAdmin } = authStore
  const { openDialog, closeDialog } = dialogStore
  const navigate = useNavigate()

  const onUpdate = async (values: UpdateAgreementFormValues) => {
    if(!agreement) return

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
    removeAgreement(id).then(() => navigate(`/agreements`))
  }

  const openUpdateDialog = () => {
    if(!agreement) return

    openDialog({
      type: 'UpdateAgreement',
      title: agreement.number,
      props: {
        agreement,
        onFinish: onUpdate
      }
    })
  }

  const openParentPage = () => navigate(`/agreements/${agreement?.parentId}`)

  useEffect(() => {
    const agreementId = Number(id)
    setFirstLoading(true)

    Promise.all([
      getAgreement(agreementId),
      getAgreementSkziUnits(agreementId),
      getAgreementActs(agreementId),
      ...isAdmin ? [
        getAgreementTypes(),
        getOrgs()
      ] : []
    ]).finally(() => setFirstLoading(false))

    return () => {
      setAgreement(null)
      setSkziUnits([])
      setActs([])
      setAgreementTypes([])
      setOrgs([])
    }
  }, [
    id, isAdmin,
    getAgreement, getAgreementSkziUnits, getAgreementActs, getAgreementTypes, getOrgs,
    setAgreement, setSkziUnits, setActs, setAgreementTypes, setOrgs
  ])

  if(isFirstLoading) {
    return <Loader />
  }

  if(!agreement) {
    return <Empty />
  }

  return (
    <div className="vertical-space">
      <AgreementInfo
        agreement={agreement}
        isLoading={isLoading}
        isAdmin={isAdmin}
        onUpdateClick={openUpdateDialog}
        onParentClick={openParentPage}
        onRemove={onRemove}
      />

      <AgreementSkziUnits
        skziUnits={skziUnits}
        isLoading={isSkziUnitsLoading}
      />

      <AgreementActs
        acts={acts}
        isLoading={isActsLoading}
      />
    </div>
  )
}

export default observer(Agreement)