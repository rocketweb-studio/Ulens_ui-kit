import {useState} from 'react'
import s from './CustomTable.module.scss'
import {CustomTableProps, SortConfig, TableCellProps} from "./types";
import {Pagination} from "../Pagination";

const TableCell = ({ children, className = '', style }: TableCellProps) => (
    <td className={`${s.cell} ${className}`} style={style}>
        {children}
    </td>
)

const TableHeader = ({
                         children,
                         className = '',
                         style,
                         sortable,
                         sortDirection,
                         onSort
                     }: TableCellProps & {
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
    onSort?: () => void;
}) => (
    <th
        className={`${s.cell} ${s.header} ${className} ${sortable ? s.sortable : ''}`}
        style={style}
        onClick={sortable ? onSort : undefined}
    >
        <div className={s.headerContent}>
            {children}
            {sortable && (
                <div className={s.sortIcons}>
          <span className={`${s.sortIcon} ${sortDirection === 'asc' ? s.active : ''}`}>
            ▲
          </span>
                    <span className={`${s.sortIcon} ${sortDirection === 'desc' ? s.active : ''}`}>
            ▼
          </span>
                </div>
            )}
        </div>
    </th>
)

export const CustomTable = <T extends Record<string, any>>({
                                                               data,
                                                               columns,
                                                               className = '',
                                                               paginated = false,
                                                               // Новые пропсы для внешнего управления пагинацией
                                                               currentPage: externalCurrentPage,
                                                               onPageChange: externalOnPageChange,
                                                               pageSize: externalPageSize,
                                                               onPageSizeChange: externalOnPageSizeChange,
                                                           }: CustomTableProps<T>) => {
    const [internalCurrentPage, setInternalCurrentPage] = useState(1)
    const [internalPageSize, setInternalPageSize] = useState(10)
    const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)

    const isExternallyControlled = externalCurrentPage !== undefined &&
        externalOnPageChange !== undefined &&
        externalPageSize !== undefined

    const currentPage = isExternallyControlled ? externalCurrentPage! : internalCurrentPage
    const currentPageSize = isExternallyControlled ? externalPageSize! : internalPageSize

    // Сортируем данные только если есть конфигурация сортировки
    const sortedData = sortConfig ? [...data].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof T]
        const bValue = b[sortConfig.key as keyof T]

        if (aValue === bValue) return 0

        if (sortConfig.direction === 'asc') {
            return aValue < bValue ? -1 : 1
        } else {
            return aValue > bValue ? -1 : 1
        }
    }) : data

    // Для внешней пагинации используем все данные, для внутренней - слайсим
    const displayData = isExternallyControlled ?
        sortedData :
        sortedData.slice(
            (currentPage - 1) * currentPageSize,
            currentPage * currentPageSize
        )

    const handleSort = (key: keyof T) => {
        let direction: 'asc' | 'desc' = 'asc'

        if (sortConfig && sortConfig.key === key) {
            if (sortConfig.direction === 'asc') {
                direction = 'desc'
            } else if (sortConfig.direction === 'desc') {
                setSortConfig(null)
                return
            }
        }

        setSortConfig({ key, direction })

        // При сортировке сбрасываем на первую страницу
        if (isExternallyControlled) {
            externalOnPageChange(1, currentPageSize)
        } else {
            setInternalCurrentPage(1)
        }
    }

    const handlePageChange = ({ page, pageSize }: { page: number; pageSize: number }) => {
        if (isExternallyControlled) {
            externalOnPageChange(page, pageSize)
            if (externalOnPageSizeChange) {
                externalOnPageSizeChange(pageSize)
            }
        } else {
            setInternalCurrentPage(page)
            setInternalPageSize(pageSize)
        }
    }

    const getSortDirection = (key: keyof T): 'asc' | 'desc' | null => {
        if (sortConfig && sortConfig.key === key) {
            return sortConfig.direction
        }
        return null
    }

    return (
        <div className={`${s.container} ${className}`}>
            <table className={s.table}>
                <thead>
                <tr>
                    {columns.map((column) => (
                        <TableHeader
                            key={String(column.key)}
                            style={{ width: column.width }}
                            sortable={column.sortable}
                            sortDirection={getSortDirection(column.key)}
                            onSort={() => handleSort(column.key)}
                        >
                            {column.title}
                        </TableHeader>
                    ))}
                </tr>
                </thead>
                <tbody>
                {displayData.map((row, index) => (
                    <tr key={index} className={s.row}>
                        {columns.map((column) => (
                            <TableCell key={String(column.key)}>
                                {column.render
                                    ? column.render(row[column.key as keyof T], row)
                                    : String(row[column.key as keyof T])
                                }
                            </TableCell>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {paginated && (
                <div className={s.paginationWrapper}>
                    <Pagination
                        onPageChange={handlePageChange}
                        elementCount={sortedData.length}
                        pageSize={currentPageSize}
                    />
                </div>
            )}
        </div>
    )
}
