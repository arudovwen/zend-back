import React, { useState } from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "@/hooks/usePagination";
import "./pagination.css";
import { Icon } from "@iconify/react";
import Select  from "@/components/forms/CustomSelect";


const leftOptions = [
  {
    text: "15/page",
    value: 15,
  },
  {
    text: "30/page",
    value: 30,
  },
  {
    text: "50/page",
    value: 50,
  },
];
const Pagination = (props: any) => {
  const {
    onPageChange,
    onPageSizeChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const [rightSelected, setRightSelected] = useState<any>("");
  const [leftSelected, setLeftSelected] = useState(leftOptions[0]);
  if (currentPage === 0) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const onLast = () => {
    onPageChange(Math.floor(totalCount / pageSize));
  };
  const onFirst = () => {
    onPageChange(1);
  };

  const handleSelected = (type: any, value: any) => {
    if (type === "left") {
      setLeftSelected(value);
      onPageSizeChange(value?.value);
    }
  };

  let lastPage = paginationRange?.[paginationRange?.length - 1];
  return (
    <div className="flex items-center justify-between text-[#636363] dark:text-white/60">
      
      <div>
        <Select
          inputClass={
            "border-blue-50 border-[0.5px] h-10 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)] dark:text-white/60 dark:bg-gray-800"
          }
          containerClass="min-w-[50px]"
          optionClass="w-auto !rounded-t !rounded-b-[0px]"
          options={leftOptions}
          handleSelected={(value: any) => handleSelected("left", value)}
          value={leftSelected}
          placement="top-end"
        />
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className={classnames("pagination-item disabled:cursor-not-allowed", {
            "opacity-50": currentPage === 1,
          })}
          onKeyUp={()=> {}}
          onClick={onFirst}
          disabled={currentPage === 1}
        >
          <Icon icon="lucide:chevron-first" />
        </button>
        <button
          type="button"
          className={classnames("pagination-item disabled:cursor-not-allowed", {
            "opacity-50": currentPage === 1,
          })}
          disabled={currentPage === 1}
          onKeyUp={()=> {}}
          onClick={onPrevious}
        >
          <Icon icon="lucide:chevron-left" />
        </button>
        <ul
          className={classnames(
            "pagination-container border-[0.5px] rounded border-blue-50 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)] ",
            {
              [className]: className,
            }
          )}
        >
          {paginationRange?.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return (
                <li key={pageNumber} className="pagination-item dots">
                  &#8230;
                </li>
              );
            }

            return (
              <li
                key={pageNumber}
                className={classnames(
                  "pagination-item  border-blue-50 border-l first:border-none ",
                  {
                    selected: pageNumber === currentPage,
                  }
                )}
                onKeyUp={()=> {}}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className={classnames("pagination-item disabled:cursor-not-allowed", {
            "opacity-50": currentPage === lastPage,
          })}
          disabled={currentPage === lastPage}
          onKeyUp={()=> {}}
          onClick={onNext}
        >
          <Icon icon="lucide:chevron-right" />
        </button>
        <button
          type="button"
          className={classnames("pagination-item disabled:cursor-not-allowed", {
            "opacity-50": currentPage === lastPage,
          })}
          disabled={currentPage === lastPage}
          onKeyUp={()=> {}}
          onClick={onLast}
        >
          <Icon icon="lucide:chevron-last" />
        </button>
      </div>
      <div className="flex gap-x-4 items-center text-[#636363] font-medium">
        <span>Go to</span>
        <div className="flex gap-x-[2px] h-10 py-1 px-1 max-w-[100px] items-center rounded border-blue-50 border-[0.5px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)]">
          <input
            className={
              "border-blue-50 flex px-[6px] outline-none w-full text-sm dark:text-white/80 dark:bg-gray-800" 
            }
            value={rightSelected}
            onChange={(e) => setRightSelected(parseInt(e.target.value, 10))}
            placeholder="10"
            type="number"
            max={Math.floor(totalCount / pageSize)}
          />
          <span className="border-l h-4 border-[#E8E8E8]" />
          <button
            disabled={!rightSelected}
            onKeyUp={()=> {}}
            onClick={() => onPageChange(rightSelected)}
            className="font-medium p-2 text-primary"
          >
            <span className="drop-shadow-lg text-sm">GO</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
