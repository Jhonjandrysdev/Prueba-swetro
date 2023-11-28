import React from "react";
import Left from '../assets/left.svg';
import Right from '../assets/right.svg';

const Pagination = ({ itemsPage, currentPage, setCurrentPage, items }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(items / itemsPage); i++) {
    pageNumbers.push(i);
  }

  const onPrevPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const onNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const indexPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center sm:justify-between">
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination">
              <a
                onClick={onPrevPage}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <span className="sr-only">Previous</span>
                <img src={Left} className="h-5 w-5 " aria-hidden="true" />
              </a>
              {pageNumbers.map((noPage) => (
                <a
                  key={noPage}
                  className={`${noPage === currentPage ? 'bg-indigo-700 text-white focus:outline border p-3 flex items-center' : 'bg-white text-black border p-3 flex items-center'}`}
                  onClick={() => indexPage(noPage)}
                >
                  {noPage}
                </a>
              ))}
              <a
                onClick={onNextPage}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage >= pageNumbers.length ? "disabled" : ''}`}
              >
                <span className="sr-only">Next</span>
                <img src={Right} className="h-5 w-5 " aria-hidden="true" />
              </a>
            </nav>
        </div>
      </div>
    </>
  );
};

export default Pagination;
