import { useEffect, useMemo } from "react";
import lineStyles from "./paginationLine.module.css";

const PaginationLine = ({ count, page, limit, setPage }) => {



  function createPagesArr(count, limit) {
    const pagesArr = [];
    const pagesAmount = Math.ceil(count / limit);

    for (let i = 1; i <= pagesAmount; i++) {
      pagesArr.push(i);
    }

    return pagesArr;
  };

  function createCurrentPagLineState(page, pages) {
    let paginationLineState = [];

    if (pages.length <= 6) {
      paginationLineState = pages;
    } else {
      if (page <= 4) {
        paginationLineState = pages.slice(0, 5);
        paginationLineState.push("...");
        paginationLineState.push(pages[pages.length - 1]);
      } else if (page >= pages.length - 1) {
        paginationLineState.push(pages[0]);
        paginationLineState.push("...");
        paginationLineState = [...paginationLineState, ...pages.slice(-5)];
      } else {
        paginationLineState.push(pages[0]);
        paginationLineState.push("...");
        paginationLineState.push(pages[page - 2]);
        paginationLineState.push(pages[page - 1]);
        paginationLineState.push(pages[page]);
        paginationLineState.push("...");
        paginationLineState.push(pages[pages.length - 1]);
      }
    }

    return paginationLineState;
  }

  const pages = useMemo(() => createPagesArr(count, limit), [count, limit]);
  const paginationLineState = useMemo(() => createCurrentPagLineState(page, pages), [page, pages]);

  useEffect(() => {
    console.log(page);
  }, [page])

  return (
    <div>
      {
        paginationLineState.map(pageNumber =>
          <button
            onClick={
              () => {
                if (Number(pageNumber)) {
                  setPage(pageNumber);
                }
              }
            }>{pageNumber}</button>
        )
      }
    </div>
  )
};

export default PaginationLine;