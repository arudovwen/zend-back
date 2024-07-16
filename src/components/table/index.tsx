import React, { useState, useEffect } from "react";
import EmptyComponent from "@/components/EmptyComponent";
import Loader from "@/components/Loader";
import FilterButton from "@/components/FilterButton"; // Adjust this import

interface Column {
  header: string;
  key: string;
  isHtml?: boolean;
}

interface FilterOption {
  label: string;
  key: string;
  value: string;
}

interface DataTableProps {
  isLoading?: boolean;
  emptyTitle?: string;
  emptySubtext?: string;
  emptyUrl?: string;
  emptyBtnText?: string;
  emptyType?: string;
  columns?: Column[];
  rows?: Record<string, any>[];
  hasSearch?: boolean;
  hasFilter?: boolean;
  hasDate?: boolean;
  filterTitle?: string;
  filterOptions?: FilterOption[];
  placeholder?: string;
  onSearch: (value: string) => void;
  onFilter: (value: string) => void;
  onDateChange?: (date: any) => void; // Adjust the type as necessary
}

const DataTable: React.FC<DataTableProps> = ({
  isLoading = false,
  emptyTitle = "No data available",
  emptySubtext = "",
  emptyUrl = "",
  emptyBtnText = "",
  emptyType = "",
  columns = [
    { header: "id", key: "id", isHtml: false },
    { header: "name", key: "name", isHtml: false },
  ],
  rows = [],
  hasSearch = false,
  hasFilter = false,
  hasDate = false,
  filterTitle = "Filters",
  filterOptions = [{ label: "All", key: "all", value: "all" }],
  placeholder = "Search by name",
  onSearch,
  onFilter,
  onDateChange,
}) => {
  const [date, setDate] = useState<any>(null); // Adjust the type as necessary
  const [filter, setFilter] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (filter) {
      onFilter(filter);
    }
  }, [filter, onFilter]);

  useEffect(() => {
    if (date) {
      onDateChange && onDateChange(date);
    }
  }, [date, onDateChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="border border-[#EAECF0] rounded-lg w-full bg-white">
      {(hasSearch || hasFilter) && (
        <div className="pb-8 pt-8 border-b border-[#EAECF0] px-8">
          <div className="flex gap-x-4 flex-col lg:flex-row gap-y-4 justify-between">
            {hasSearch && (
              <div className="relative flex items-center">
                <span className="absolute left-4 pointer-events-none text-[#667085]">
                  <i className="uil uil-search"></i>
                </span>
                <input
                  className="border border-[#DFE5EC] text-sm focus:pr-3 pl-10 rounded-lg w-full lg:w-[280px] h-11 focus:outline-none py-[10px] transition ease-in-out duration-300"
                  type="search"
                  placeholder={placeholder}
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
            )}
            <div className="flex gap-x-4 items-center">
              {/* {hasDate && (
                <DatePicker
                  value={date}
                  onChange={setDate}
                  range
                  multiCalendars
                  placeholder="Select date"
                  inputClassName="!text-sm placeholder:!text-[#344054] !h-11 !font-medium"
                />
              )} */}
              {hasFilter && (
                <FilterButton
                  modelValue={filter}
                  options={filterOptions}
                  title={filterTitle}
                  onChange={setFilter}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className="overflow-x-auto rounded-lg"
        style={{ display: isLoading ? "none" : "block" }}
      >
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-[#EAECF0]">
              {columns.map((column) => (
                <th
                  className="bg-[#F9FAFB] py-3 px-6 text-xs font-medium text-[#475467] capitalize text-left"
                  key={column.key}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr
                  className="border-b last:border-none border-[#EAECF0] even:bg-[#F9FAFB]"
                  key={index}
                >
                  {columns.map((column) => (
                    <td className="text-sm text-[#454745] p-6" key={column.key}>
                      {column.isHtml ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: row[column.key] }}
                        />
                      ) : (
                        <span>{row[column.key] || "-"}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center p-6">
                  {emptyTitle}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && rows.length === 0 && (
        <EmptyComponent
          title={emptyTitle}
          subtext={emptySubtext}
          url={emptyUrl}
          btnText={emptyBtnText}
          type={emptyType}
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default DataTable;
