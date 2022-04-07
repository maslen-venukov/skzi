import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import signTypesStore from '../store/sign-types/sign-types.store'
import TypesTable from '../components/TypesTable'

const SignTypes: React.FC = () => {
  const { types, isLoading, getSignTypes, setSignTypes } = signTypesStore

  useEffect(() => {
    getSignTypes()

    return () => {
      setSignTypes([])
    }
  }, [getSignTypes, setSignTypes])

  return (
    <TypesTable
      title="Типы подписей"
      types={types}
      isLoading={isLoading}
    />
  )
}

export default observer(SignTypes)