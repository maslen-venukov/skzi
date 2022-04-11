import React from 'react'
import { Form, Select } from 'antd'
import { Rule } from 'antd/lib/form'
import Loader from './Loader'

interface FormSearchSelectProps<T> {
  items: T[]
  label: string
  name: string
  rules?: Rule[]
  isLoading: boolean
  value: string
  setValue: (value: string) => void
  renderItem: (item: T) => React.ReactChild
}

const FormSearchSelect: <T>(props: FormSearchSelectProps<T>) => React.ReactElement = ({
  items,
  label,
  name,
  rules,
  isLoading,
  value,
  setValue,
  renderItem
}) => {
  const onClear = () => setValue('')

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
    >
      <Select
        showSearch
        allowClear
        filterOption={false}
        notFoundContent={isLoading ? <Loader /> : null}
        value={value}
        onSearch={setValue}
        onClear={onClear}
      >
        {items.map(renderItem)}
      </Select>
    </Form.Item>
  )
}

export default FormSearchSelect