import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import skziTypesStore from '../store/skzi-types/skzi-types.store'
import TypesTable from '../components/TypesTable'

const SkziTypes: React.FC = () => {
  const { types, isLoading, getSkziTypes, setSkziTypes } = skziTypesStore

  useEffect(() => {
    getSkziTypes()

    return () => {
      setSkziTypes([])
    }
  }, [getSkziTypes, setSkziTypes])

  return (
    <TypesTable
      title="Типы СКЗИ"
      types={types}
      isLoading={isLoading}
    />
  )
}

export default observer(SkziTypes)