import s from './Pagination.module.scss';
import {useEffect, useState} from "react";

type Props = {
  onPageChange: ({page, pageSize}: { page: number; pageSize: number }) => void;
  elementCount: number;
};
export const Pagination = ({onPageChange, elementCount}: Props) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const totalPage = Math.ceil(elementCount / pageSize)

  useEffect(() => {
    onPageChange({page, pageSize})
  }, [page, pageSize, onPageChange]);


  const previousPageHandler = () => {
    if (page === 1) return
    setPage(prevState => prevState - 1)

  }
  const nextPageHandler = () => {
    if (page === totalPage) return
    setPage(prevState => prevState + 1)

  }
  const setPageHandler = (page: number) => {
    setPage(page)

  }
  const setPageSizeHandler = (pageSize: number) => {
    setPageSize(pageSize)

  }


  let start: number;
  let end: number;


  if (totalPage <= 7) {
    start = 2;
    end = Math.max(1, totalPage - 1);
  } else if (page <= 4) {
    start = 2;
    end = 5;
  } else if (page >= totalPage - 3) {
    start = totalPage - 4;
    end = totalPage - 1;
  } else {
    start = page - 1;
    end = page + 1;
  }

  const pages = end >= start ? Array.from({length: end - start + 1}, (_, i) => start + i) : [];

  return (
    <div className={s.paginationContainer}>
      <button onClick={previousPageHandler}
              className={`${s.arrow} ${page === 1 ? s.arrowDisabled : ''}`}> {'<'} </button>

      <button onClick={() => setPageHandler(1)} className={`${page === 1 ? s.active : ''}`}>1</button>

      {start > 2 && <span className={s.dot}>...</span>}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPageHandler(p)}
          className={`${page === p ? s.active : ''}`}>{p}</button>
      ))}

      {end < totalPage - 1 && <span className={s.dot}>...</span>}

      <button onClick={() => setPageHandler(totalPage)}
              className={`${page === totalPage ? s.active : ''}`}>{totalPage}</button>

      <button onClick={nextPageHandler}
              className={`${s.arrow} ${page === totalPage ? s.arrowDisabled : ''}`}> {'>'} </button>

      <div className={s.pageSizeContainer}>
        <span>Show</span>
        <select name='pageSize' value={pageSize} onChange={(e) => {
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