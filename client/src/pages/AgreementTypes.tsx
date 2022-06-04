import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import agreementTypesStore from '../store/agreement-types/agreement-types.store'
import TypesTable from '../components/TypesTable'

const AgreementTypes: React.FC = () => {
  const { types, isLoading, getAgreementTypes, setAgreementTypes } = agreementTypesStore

  useEffect(() => {
    getAgreementTypes()

    return () => {
      setAgreementTypes([])
    }
  }, [])

  return (
    <TypesTable
      title="Типы соглашений"
      types={types}
      isLoading={isLoading}
    />
  )
}

export default observer(AgreementTypes)