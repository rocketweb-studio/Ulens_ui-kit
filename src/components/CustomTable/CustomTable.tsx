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
                         onSort,
                         onSortAsc,
                         onSortDesc
                     }: TableCellProps & {
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
    onSort?: () => void;
    onSortAsc?: () => void;
    onSortDesc?: () => void;
}) => {
    const handleSortClick = () => {
        if (!sortable) return;

        if (onSortAsc && onSortDesc) {
            return
        }

        onSort?.();
    };

    const handleIconClick = (direction: 'asc' | 'desc', e: React.MouseEvent) => {
        e.stopPropagation();
        if (!sortable) return;

        if (direction === 'asc') {
            onSortAsc?.();
        } else {
            onSortDesc?.();
        }
    };

    return (
        <th
            className={`${s.cell} ${s.header} ${className} ${sortable ? s.sortable : ''}`}
            style={style}
            onClick={handleSortClick}
        >
            <div className={s.headerContent}>
                {children}
                {sortable && (
                    <div className={s.sortIcons}>
                        <span
                            className={`${s.sortIcon} ${sortDirection === 'asc' ? s.active : ''} ${onSortAsc ? s.clickable : ''}`}
                            onClick={(e) => handleIconClick('asc', e)}
                        >
                            ▲
                        </span>
                        <span
                            className={`${s.sortIcon} ${sortDirection === 'desc' ? s.active : ''} ${onSortDesc ? s.clickable : ''}`}
                            onClick={(e) => handleIconClick('desc', e)}
                        >
                            ▼
                        </span>
                    </div>
                )}
            </div>
        </th>
    );
}

const TableLoading = ({ colSpan }: { colSpan: number }) => (
    <tr className={s.loadingRow}>
        <td colSpan={colSpan} className={s.loadingCell}>
            <div className={s.loadingContent}>
                Loading...
            </div>
        </td>
    </tr>
)

export const CustomTable = <T extends Record<string, any>>({
                                                               data,
                                                               columns,
                                                               className = '',
                                                               paginated = false,
                                                               currentPage: externalCurrentPage,
                                                               onPageChange: externalOnPageChange,
                                                               pageSize: externalPageSize,
                                                               onPageSizeChange: externalOnPageSizeChange,
                                                               elementCount: externalElementCount,
                                                               loading = false,
                                                               sortConfig: externalSortConfig,
                                                               onSortChange,
                                                           }: CustomTableProps<T>) => {
    const [internalCurrentPage, setInternalCurrentPage] = useState(1)
    const [internalPageSize, setInternalPageSize] = useState(10)
    const [internalSortConfig, setInternalSortConfig] = useState<SortConfig<T> | null>(null)

    const isExternallyControlled = externalCurrentPage !== undefined &&
        externalOnPageChange !== undefined &&
        externalPageSize !== undefined

    const isSortExternallyControlled = externalSortConfig !== undefined && onSortChange !== undefined

    const currentPage = isExternallyControlled ? externalCurrentPage! : internalCurrentPage
    const currentPageSize = isExternallyControlled ? externalPageSize! : internalPageSize
    const sortConfig = isSortExternallyControlled ? externalSortConfig : internalSortConfig

    const sortedData = sortConfig ? [...data].sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (aValue === bValue) return 0

        if (sortConfig.direction === 'asc') {
            return aValue < bValue ? -1 : 1
        } else {
            return aValue > bValue ? -1 : 1
        }
    }) : data

    const displayData = isExternallyControlled ?
        data :
        sortedData.slice(
            (currentPage - 1) * currentPageSize,
            currentPage * currentPageSize
        )

    const totalElementCount = isExternallyControlled ?
        (externalElementCount !== undefined ? externalElementCount : data.length) :
        sortedData.length

    const handleSort = (key: keyof T, direction?: 'asc' | 'desc') => {
        if (loading) return;

        let newDirection: 'asc' | 'desc' = direction || 'asc';

        if (!direction && sortConfig && sortConfig.key === key) {
            if (sortConfig.direction === 'asc') {
                newDirection = 'desc'
            } else if (sortConfig.direction === 'desc') {
                if (isSortExternallyControlled) {
                    onSortChange?.(null, key)
                } else {
                    setInternalSortConfig(null)
                }

                if (isExternallyControlled) {
                    externalOnPageChange(1, currentPageSize)
                } else {
                    setInternalCurrentPage(1)
                }
                return
            }
        }

        const newSortConfig = { key, direction: newDirection }

        if (isSortExternallyControlled) {
            onSortChange?.(newSortConfig, key)
        } else {
            setInternalSortConfig(newSortConfig)
        }

        if (isExternallyControlled) {
            externalOnPageChange(1, currentPageSize)
        } else {
            setInternalCurrentPage(1)
        }
    }

    const handleSortAsc = (key: keyof T) => {
        handleSort(key, 'asc')
    }

    const handleSortDesc = (key: keyof T) => {
        handleSort(key, 'desc')
    }

    const handlePageChange = ({ page, pageSize }: { page: number; pageSize: number }) => {
        if (loading) return;

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
        <div className={`${s.container} ${className} ${loading ? s.loading : ''}`}>
            <table className={s.table}>
                <thead>
                <tr>
                    {columns.map((column) => (
                        <TableHeader
                            key={String(column.key)}
                            style={{ width: column.width }}
                            sortable={column.sortable && !loading}
                            sortDirection={getSortDirection(column.key)}
                            onSort={() => handleSort(column.key)}
                            onSortAsc={column.sortable ? () => handleSortAsc(column.key) : undefined}
                            onSortDesc={column.sortable ? () => handleSortDesc(column.key) : undefined}
                        >
                            {column.title}
                        </TableHeader>
                    ))}
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <TableLoading colSpan={columns.length} />
                ) : (
                    displayData.map((row, index) => (
                        <tr key={index} className={s.row}>
                            {columns.map((column) => (
                                <TableCell key={String(column.key)}>
                                    {column.render
                                        ? column.render(row[column.key], row)
                                        : String(row[column.key])
                                    }
                                </TableCell>
                            ))}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            {paginated && (
                <div className={s.paginationWrapper}>
                    <Pagination
                        onPageChange={handlePageChange}
                        elementCount={totalElementCount}
                        pageSize={currentPageSize}
                        currentPage={currentPage}
                        disabled={loading}
                    />
                </div>
            )}
        </div>
    )
}
