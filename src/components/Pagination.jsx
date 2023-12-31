import React from "react";
import Left from "../assets/left.svg";
import Right from "../assets/right.svg";

const Pagination = ({ itemsPage, currentPage, setCurrentPage, items }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(items / itemsPage); i++) {
    pageNumbers.push(i);
  }

  const onPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const indexPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex items-center justify-center px-4 py-3 sm:px-6">
        <div className="flex items-center">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={onPrevPage}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset w-7"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <img src={Left} className="h-5 w-5 " aria-hidden="true" />
            </button>
            {pageNumbers.map((noPage) => (
              <button
                key={noPage}
                className={`${
                  noPage === currentPage
                    ? "bg-blue-600 text-white border p-3 flex items-center"
                    : "bg-white text-black border p-3 flex items-center"
                }`}
                onClick={() => indexPage(noPage)}
              >
                {noPage}
              </button>
            ))}
            <button
              onClick={onNextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-blue-600 focus:z-20 focus:outline-offset-0 w-7"
              disabled={currentPage >= pageNumbers.length}
              
            >
              <span className="sr-only">Next</span>
              <img src={Right} className="h-5 w-5 " aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Pagination;
