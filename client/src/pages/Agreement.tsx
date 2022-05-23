import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Empty } from 'antd'
import Loader from '../components/Loader'
import agreementsStore from '../store/agreements/agreements.store'
import AgreementInfo from '../components/agreements/AgreementInfo'
import AgreementSkziUnits from '../components/agreements/AgreementSkziUnits'
import { useParams } from 'react-router-dom'
import skziUnitsStore from '../store/skzi-units/skzi-units.store'
import agreementTypesStore from '../store/agreement-types/agreement-types.store'
import orgsStore from '../store/orgs/orgs.store'
import authStore from '../store/auth/auth.store'
import dialogStore from '../store/dialog/dialog.store'
import nullify from '../utils/nullify'
import getDelta from '../utils/getDelta'
import { UpdateAgreementFormValues } from '../components/dialogs/UpdateAgreementDialog'

const Agreement: React.FC = () => {
  const { id } = useParams()
  const { agreement, isLoading: isAgreementLoading, getAgreement, updateAgreement, setAgreement } = agreementsStore
  const { skziUnits, isLoading: isSkziUnitsLoading, getSkziUnits, setSkziUnits } = skziUnitsStore
  const { getAgreementTypes, setAgreementTypes } = agreementTypesStore
  const { getOrgs, setOrgs } = orgsStore
  const { isAdmin } = authStore
  const { openDialog, closeDialog } = dialogStore

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

  useEffect(() => {
    const agreementId = Number(id)
    Promise.all([
      getAgreement(agreementId),
      getSkziUnits({ agreementId }),
      ...isAdmin ? [
        getAgreementTypes(),
        getOrgs()
      ] : []
    ])

    return () => {
      setAgreement(null)
      setSkziUnits([])
      setAgreementTypes([])
      setOrgs([])
    }
  }, [
    id, isAdmin,
    getAgreement, getSkziUnits, getAgreementTypes, getOrgs,
    setAgreement, setSkziUnits, setAgreementTypes, setOrgs
  ])

  if(isAgreementLoading) {
    return <Loader />
  }

  if(!agreement) {
    return <Empty />
  }

  return (
    <div className="vertical-space">
      <AgreementInfo
        agreement={agreement}
        isAdmin={isAdmin}
        onUpdateClick={openUpdateDialog}
      />

      <AgreementSkziUnits
        isLoading={isSkziUnitsLoading}
        skziUnits={skziUnits}
      />
    </div>
  )
}

export default observer(Agreement)