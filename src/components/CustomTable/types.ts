import { CSSProperties, ReactNode } from 'react'

export type Column<T = Record<string, any>> = {
  key: keyof T
  title: string
  render?: (value: any, row: T) => ReactNode
  width?: string
  sortable?: boolean
}

export type CustomTableProps<T = Record<string, any>> = {
  data: T[]
  columns: Column<T>[]
  className?: string
  paginated?: boolean
}

export type TableCellProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export type SortConfig<T = Record<string, any>> = {
  key: keyof T
  direction: 'asc' | 'desc'
}
