import React, { useMemo } from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import {
  StyledCustomPageInput,
  StyledCustomPageInputWrapper,
  StyledPaginationButton,
  StyledPaginationLine,
} from './styled';

const PaginationLine = ({ count, page, limit, setPage }) => {
  const pages = useMemo(() => {
    const pagesArr = [];
    const pagesAmount = Math.ceil(count / limit);

    for (let i = 1; i <= pagesAmount; i += 1) {
      pagesArr.push(i);
    }

    return pagesArr;
  }, [count, limit]);

  const paginationLineStateArr = useMemo(() => {
    let paginationLineState = [];

    if (pages.length <= 6) {
      paginationLineState = pages;
    } else if (page <= 4) {
      paginationLineState = pages.slice(0, 5);
      paginationLineState.push('...');
      paginationLineState.push(pages[pages.length - 1]);
    } else if (page >= pages[pages.length - 4]) {
      paginationLineState.push(pages[0]);
      paginationLineState.push('...');
      paginationLineState = [...paginationLineState, ...pages.slice(-5)];
    } else {
      paginationLineState.push(pages[0]);
      paginationLineState.push('...');
      paginationLineState.push(pages[page - 2]);
      paginationLineState.push(pages[page - 1]);
      paginationLineState.push(pages[page]);
      paginationLineState.push('...');
      paginationLineState.push(pages[pages.length - 1]);
    }

    paginationLineState = paginationLineState.map((lineItem) => ({
      id: v4(),
      pageNumber: lineItem,
    }));

    return paginationLineState;
  }, [page, pages]);

  const setPrevPage = (e) => {
    if (pages.length === 1) {
      return;
    }

    if (page > 1) {
      setPage(page - 1, e);
      return;
    }

    setPage(pages[pages.length - 1], e);
  };

  const setNextPage = (e) => {
    if (pages.length === 1) {
      return;
    }

    if (page < pages.length) {
      setPage(page + 1, e);
      return;
    }

    setPage(pages[0], e);
  };

  const setCustomPage = (e) => {
    const typedPage = Number(e.target.value);

    if (
      typedPage >= pages[0] &&
      typedPage <= pages[pages.length - 1] &&
      pages.length !== 1 &&
      typedPage !== page
    ) {
      setPage(typedPage, e);
    }
  };

  if (!pages.length) {
    return null;
  }

  return (
    <StyledPaginationLine>
      <StyledCustomPageInputWrapper>
        <StyledCustomPageInput
          disabled={pages.length === 1}
          onChange={setCustomPage}
        />
      </StyledCustomPageInputWrapper>

      <StyledPaginationButton
        disabled={pages.length === 1}
        onClick={setPrevPage}
      >
        {'<'}
      </StyledPaginationButton>

      {paginationLineStateArr.map(({ id, pageNumber }) => (
        <StyledPaginationButton
          key={id}
          isActive={pageNumber === page}
          onClick={(e) => {
            if (Number(pageNumber) && pageNumber !== page) {
              setPage(pageNumber, e);
            }
          }}
        >
          {pageNumber}
        </StyledPaginationButton>
      ))}

      <StyledPaginationButton
        disabled={pages.length === 1}
        onClick={setNextPage}
      >
        {'>'}
      </StyledPaginationButton>
    </StyledPaginationLine>
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
