import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { PaginationProps } from 'antd'
import { Pagination } from '../interfaces/pagination.interface'

interface PaginationParams {
  fetch: (params: Pagination) => Promise<void>
}

interface PaginationResult extends PaginationProps {
  fetch: () => Promise<void>
}

const pageSizeOptions = [3, 6, 9]

const usePagination = ({ fetch }: PaginationParams): PaginationResult => {
  const [params, setParams] = useSearchParams()
  const [page, setPage] = useState(Number(params.get('page')) || 1)
  const [count, setCount] = useState(Number(params.get('count')) || pageSizeOptions[0])
  const location = useLocation()
  const navigate = useNavigate()

  const showTotal = (total: number) => `Всего ${total}`

  const onChange = (page: number, count: number) => {
    setPage(page)
    setCount(count)
    const params = new URLSearchParams({
      page: page.toString(),
      count: count.toString()
    })
    setParams(params)
    navigate(`${location.pathname}?${params}`)
  }

  useEffect(() => {
    fetch({ page, count })
  }, [page, count])

  return {
    current: page,
    pageSize: count,
    pageSizeOptions,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal,
    onChange,
    onShowSizeChange: onChange,
    fetch: async () => await fetch({ page, count })
  }
}

export default usePagination