import { useMemo, useState } from 'react'
import { TableColumnsType, CheckboxProps } from 'antd'

type ColumnsMap<T> = Partial<Record<keyof T, boolean>>

const useColumns = <T>(columns: TableColumnsType<T>) => {
  const [columnsMap, setColumnsMap] = useState<ColumnsMap<T>>(columns.reduce((acc, column) => ({
    ...acc,
    [column.key as string]: true
  }), {}) as ColumnsMap<T>)

  const viewColumns = useMemo(() => (
    columns.filter(column => columnsMap[column.key as keyof typeof columnsMap])
  ), [columnsMap])

  const getCheckboxProps = (key: keyof T): CheckboxProps => ({
    checked: columnsMap[key],
    disabled: columnsMap[key] && viewColumns.length === 1,
    onChange: e => setColumnsMap({ ...columnsMap, [key]: e.target.checked })
  })

  return {
    columns,
    viewColumns,
    getCheckboxProps
  }
}

export default useColumns