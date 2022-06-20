import React, { useRef } from 'react'
import { Button, Input, InputRef, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import { FilterConfirmProps } from 'antd/lib/table/interface'

const useSearchColumn = <T extends Record<string, any>>() => {
  const searchInput = useRef<InputRef>(null)

  const handleReset = (
    clearFilters: () => void,
    confirm: (param?: FilterConfirmProps) => void,
  ) => {
    clearFilters();
    confirm();
  };

  const getColumnSearchProps = (dataIndex: keyof T): ColumnType<T> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder="Поиск"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Найти
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Сбросить
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),

    onFilter: (value, record) => (
      record[dataIndex] && record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase())
    ),

    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    }
  })

  return { getColumnSearchProps }
}

export default useSearchColumn