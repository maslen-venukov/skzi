import React from 'react'
import { Tag } from 'antd'

interface StatusTagProps {
  value: boolean
}

const StatusTag: React.FC<StatusTagProps> = ({ value }) => (
  <Tag color={value ? 'green' : 'red'}>
    {value ? 'Да' : 'Нет'}
  </Tag>
)

export default StatusTag