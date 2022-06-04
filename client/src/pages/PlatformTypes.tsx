import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import platformTypesStore from '../store/platform-types/platform-types.store'
import TypesTable from '../components/TypesTable'

const PlatformTypes: React.FC = () => {
  const { types, isLoading, getPlatformTypes, setPlatformTypes } = platformTypesStore

  useEffect(() => {
    getPlatformTypes()

    return () => {
      setPlatformTypes([])
    }
  }, [])

  return (
    <TypesTable
      title="Типы платформ"
      types={types}
      isLoading={isLoading}
    />
  )
}

export default observer(PlatformTypes)