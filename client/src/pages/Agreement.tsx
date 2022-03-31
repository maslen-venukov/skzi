import React from 'react'
import { useParams } from 'react-router-dom'

const Agreement: React.FC = () => {
  const { id } = useParams()

  return (
    <div>Agreement {id}</div>
  )
}

export default Agreement