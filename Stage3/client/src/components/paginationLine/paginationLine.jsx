import { useEffect, useMemo } from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import lineStyles from './paginationLine.module.css';
import MyInput from '../../UI/myInput/myInput';

const PaginationLine = ({ count, page, limit, setPage }) => {
  function createPagesArr(countVal, limitVal) {
    const pagesArr = [];
    const pagesAmount = Math.ceil(countVal / limitVal);

    for (let i = 1; i <= pagesAmount; i += 1) {
      pagesArr.push(i);
    }

    return pagesArr;
  }

  function createCurrentPagLineState(currPage, pages) {
    let paginationLineState = [];

    if (pages.length <= 6) {
      paginationLineState = pages;
    } else if (currPage <= 4) {
      paginationLineState = pages.slice(0, 5);
      paginationLineState.push('...');
      paginationLineState.push(pages[pages.length - 1]);
    } else if (currPage >= pages[pages.length - 4]) {
      paginationLineState.push(pages[0]);
      paginationLineState.push('...');
      paginationLineState = [...paginationLineState, ...pages.slice(-5)];
    } else {
      paginationLineState.push(pages[0]);
      paginationLineState.push('...');
      paginationLineState.push(pages[currPage - 2]);
      paginationLineState.push(pages[currPage - 1]);
      paginationLineState.push(pages[currPage]);
      paginationLineState.push('...');
      paginationLineState.push(pages[pages.length - 1]);
    }

    paginationLineState = paginationLineState.map((lineItem) => {
      return { id: v4(), pageNumber: lineItem };
    });

    return paginationLineState;
  }

  const pages = useMemo(() => createPagesArr(count, limit), [count, limit]);
  const paginationLineState = useMemo(
    () => createCurrentPagLineState(page, pages),
    [page, pages]
  );

  const setPrevPage = () => {
    if (pages.length === 1) {
      return;
    }

    if (page > 1) {
      setPage(page - 1);
      return;
    }

    setPage(pages[pages.length - 1]);
  };

  const setNextPage = () => {
    if (pages.length === 1) {
      return;
    }

    if (page < pages.length) {
      setPage(page + 1);
      return;
    }

    setPage(pages[0]);
  };

  const setCustomPage = (e) => {
    const typedPage = Number(e.target.value);

    if (
      typedPage >= pages[0] &&
      typedPage <= pages[pages.length - 1] &&
      pages.length !== 1 &&
      typedPage !== page
    ) {
      setPage(typedPage, true);
    }
  };

  if (!pages.length) {
    return null;
  }

  return (
    <div
      data-testid='pagination-line'
      className={lineStyles['pagination-line']}
    >
      <div className={lineStyles['custom-page-block']}>
        <MyInput
          type='number'
          className={lineStyles['custom-page-input']}
          placeholder='Page number'
          title='Enter your page here'
          disabled={pages.length === 1}
          onChange={setCustomPage}
        ></MyInput>
      </div>

      <button
        disabled={pages.length === 1}
        type='button'
        className={lineStyles['pagination-btn']}
        onClick={setPrevPage}
      >
        {'<'}
      </button>
      {paginationLineState.map(({ id, pageNumber }) => (
        <button
          key={id}
          type='button'
          className={`${lineStyles['pagination-btn']} ${
            pageNumber === page ? lineStyles.active : ''
          }`}
          onClick={() => {
            if (Number(pageNumber) && pageNumber !== page) {
              setPage(pageNumber);
            }
          }}
        >
          {pageNumber}
        </button>
      ))}
      <button
        disabled={pages.length === 1}
        type='button'
        className={lineStyles['pagination-btn']}
        onClick={setNextPage}
      >
        {'>'}
      </button>
    </div>
  );
};
PaginationLine.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  limit: PropTypes.number,
  setPage: PropTypes.func,
};

PaginationLine.defaultProps = {
  count: 1,
  page: 1,
  limit: 1,
  setPage: () => {},
};

export default PaginationLine;
