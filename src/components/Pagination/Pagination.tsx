import s from './Pagination.module.scss';
import {useEffect, useState} from "react";

type Props = {
  onPageChange: ({page, pageSize}: { page: number; pageSize: number }) => void;
  elementCount: number;
  // Добавляем пропсы для внешнего управления
  currentPage?: number;
  pageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;
};

export const Pagination = ({onPageChange, elementCount, currentPage, pageSize, onPageSizeChange}: Props) => {
  const isControlled = currentPage !== undefined && pageSize !== undefined;

  const [internalPage, setInternalPage] = useState<number>(1)
  const [internalPageSize, setInternalPageSize] = useState<number>(10)

  const actualPage = isControlled ? currentPage! : internalPage;
  const actualPageSize = isControlled ? pageSize! : internalPageSize;

  const totalPage = Math.ceil(elementCount / actualPageSize)

  useEffect(() => {
    onPageChange({page: actualPage, pageSize: actualPageSize})
  }, [actualPage, actualPageSize, onPageChange]);

  const previousPageHandler = () => {
    if (actualPage === 1) return
    if (isControlled) {
      onPageChange({page: actualPage - 1, pageSize: actualPageSize})
    } else {
      setInternalPage(prevState => prevState - 1)
    }
  }

  const nextPageHandler = () => {
    if (actualPage === totalPage) return
    if (isControlled) {
      onPageChange({page: actualPage + 1, pageSize: actualPageSize})
    } else {
      setInternalPage(prevState => prevState + 1)
    }
  }

  const setPageHandler = (page: number) => {
    if (isControlled) {
      onPageChange({page, pageSize: actualPageSize})
    } else {
      setInternalPage(page)
    }
  }

  const setPageSizeHandler = (pageSize: number) => {
    if (isControlled) {
      onPageChange({page: 1, pageSize})
      if (onPageSizeChange) {
        onPageSizeChange(pageSize)
      }
    } else {
      setInternalPageSize(pageSize)
      setInternalPage(1)
    }
  }

  let start: number;
  let end: number;

  if (totalPage <= 7) {
    start = 2;
    end = Math.max(1, totalPage - 1);
  } else if (actualPage <= 4) {
    start = 2;
    end = 5;
  } else if (actualPage >= totalPage - 3) {
    start = totalPage - 4;
    end = totalPage - 1;
  } else {
    start = actualPage - 1;
    end = actualPage + 1;
  }

  const pages = end >= start ? Array.from({length: end - start + 1}, (_, i) => start + i) : [];

  return (
      <div className={s.paginationContainer}>
        <button onClick={previousPageHandler}
                className={`${s.arrow} ${actualPage === 1 ? s.arrowDisabled : ''}`}> {'<'} </button>

        <button onClick={() => setPageHandler(1)} className={`${actualPage === 1 ? s.active : ''}`}>1</button>

        {start > 2 && <span className={s.dot}>...</span>}

        {pages.map((p) => (
            <button
                key={p}
                onClick={() => setPageHandler(p)}
                className={`${actualPage === p ? s.active : ''}`}>{p}</button>
        ))}

        {end < totalPage - 1 && <span className={s.dot}>...</span>}

        {totalPage > 1 && <button onClick={() => setPageHandler(totalPage)}
                                  className={`${actualPage === totalPage ? s.active : ''}`}>{totalPage}</button>}

        <button onClick={nextPageHandler}
                className={`${s.arrow} ${actualPage === totalPage ? s.arrowDisabled : ''}`}> {'>'} </button>

        <div className={s.pageSizeContainer}>
          <span>Show</span>
          <select name='pageSize' value={actualPageSize} onChange={(e) => {
            setPageSizeHandler(Number(e.target.value))
          }}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>on page</span>
        </div>
      </div>
  );
};
