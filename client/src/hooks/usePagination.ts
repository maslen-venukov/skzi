import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

interface Pagination {
  page: number
  count: number
}

interface PaginationParams {
  fetch: (params: Pagination) => Promise<void>
}

const pageSizeOptions = [2, 4, 8]

const usePagination = ({ fetch }: PaginationParams) => {
  const [params, setParams] = useSearchParams()
  const [current, setCurrent] = useState(Number(params.get('page')) || 1)
  const [pageSize, setPageSize] = useState(Number(params.get('count')) || pageSizeOptions[0])
  const location = useLocation()
  const navigate = useNavigate()

  const onChange = (current: number, pageSize: number) => {
    setCurrent(current)
    setPageSize(pageSize)
    const params = new URLSearchParams({
      page: current.toString(),
      count: pageSize.toString()
    })
    setParams(params)
    navigate(`${location.pathname}?${params.toString()}`)
  }

  useEffect(() => {
    fetch({ page: current, count: pageSize })
  }, [current, pageSize])

  return {
    current,
    pageSize,
    pageSizeOptions,
    showSizeChanger: true,
    onChange,
    onShowSizeChange: onChange
  }
}

export default usePagination