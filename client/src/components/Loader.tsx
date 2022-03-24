import React from 'react'
import { Spin } from 'antd'

interface LoaderProps {
  size?: 'small' | 'default' | 'large'
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
  return (
    <div className="loader">
      <Spin size={size || 'large'} />
    </div>
  )
}

export default Loader