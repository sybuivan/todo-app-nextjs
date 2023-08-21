import React, { useEffect, useState } from 'react';

interface IPagination {
  totalPage: number;
  currentPage: number;
  onChange?: (page: number) => void;
}

const PaginationItem = ({
  page,
  currentPage,
  onChange,
}: {
  page: number;
  currentPage: number;
  onChange?: (page: number) => void;
}) => {
  const isActive = page === currentPage;

  return (
    <li
      className="hover:cursor-pointer"
      onClick={() => {
        onChange(page);
      }}
    >
      <a
        className={`flex items-center justify-center px-4 h-10 leading-tight ${
          isActive
            ? 'text-white bg-blue-500 border-blue-500 hover:bg-blue-600'
            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
        } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
      >
        {page}
      </a>
    </li>
  );
};

const Pagination = ({ currentPage, totalPage, onChange }: IPagination) => {
  const [paginationItems, setPaginationItems] = useState<any>([]);

  useEffect(() => {
    const newPaginationItems = [];
    for (let index = 0; index < totalPage; index++) {
      newPaginationItems.push(index + 1);
    }
    setPaginationItems(newPaginationItems);
  }, [totalPage]);

  return (
    <nav
      aria-label="Page navigation example"
      className="flex justify-center mt-2"
    >
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>
        {totalPage === 1 ? (
          <PaginationItem page={1} currentPage={currentPage} />
        ) : (
          <>
            {paginationItems.map((item) => (
              <PaginationItem
                key={item}
                page={item}
                currentPage={currentPage}
                onChange={onChange}
              />
            ))}
          </>
        )}

        <li>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
