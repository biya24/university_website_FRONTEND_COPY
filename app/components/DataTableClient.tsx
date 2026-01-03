"use client";

import { useState, useMemo } from "react";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  dateFilterKeys?: { from: keyof T; to: keyof T };
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

export default function DataTableClient<T extends Record<string, any>>({
  data,
  columns,
  searchKeys,
  dateFilterKeys,
  pageSizeOptions = [10, 25, 50],
  defaultPageSize = 10,
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* ---------- FILTER ---------- */
  const filtered = useMemo(() => {
    return data
      .filter((row) => {
        if (!search) return true;

        // Search in selected keys or all string columns
        const keys = searchKeys || Object.keys(row) as (keyof T)[];
        return keys.some((k) =>
          String(row[k] ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      })
      .filter((row) => {
        if (!dateFilterKeys || (!fromDate && !toDate)) return true;
        const { from, to } = dateFilterKeys;
        const d = new Date(row[from] ?? row[to]);
        if (fromDate && d < new Date(fromDate)) return false;
        if (toDate && d > new Date(toDate)) return false;
        return true;
      });
  }, [data, search, fromDate, toDate, searchKeys, dateFilterKeys]);

  /* ---------- SORT ---------- */
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const v1 = a[sortKey];
      const v2 = b[sortKey];
      if (v1 === v2) return 0;
      return sortDir === "asc" ? (v1 > v2 ? 1 : -1) : v1 < v2 ? 1 : -1;
    });
  }, [filtered, sortKey, sortDir]);

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      {/* CONTROLS */}
      <div className="flex flex-wrap gap-4 justify-between mb-6 items-center">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded w-full md:w-64"
        />

        {/* DATE FILTER */}
        {dateFilterKeys && (
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setPage(1);
              }}
              className="border px-2 py-1 rounded"
            />
            <span>to</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setPage(1);
              }}
              className="border px-2 py-1 rounded"
            />
          </div>
        )}

        {/* PAGE SIZE SELECTOR */}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
          className="border px-2 py-1 rounded"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      {/* TABLE */}
<div className="overflow-x-auto border rounded-lg">
  <table className="min-w-full border-collapse">
    <thead className="bg-gray-100">
      <tr>
        {columns.map((c) => (
          <th
            key={c.key}
            className="px-4 py-2 text-left cursor-pointer whitespace-nowrap"
            onClick={() => {
              if (!c.sortable) return;
              setSortKey(c.key);
              setSortDir((d) =>
                sortKey === c.key && d === "asc" ? "desc" : "asc"
              );
            }}
          >
            {c.label}
            {sortKey === c.key && (sortDir === "asc" ? " ↑" : " ↓")}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {paginated.length === 0 ? (
        <tr>
          <td colSpan={columns.length} className="p-6 text-center">
            No records found
          </td>
        </tr>
      ) : (
        paginated.map((row, i) => (
          <tr key={i} className="border-t">
            {columns.map((c) => (
              <td key={c.key} className="px-4 py-2 whitespace-normal">
                {c.render ? c.render(row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>


      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages} ({filtered.length} records)
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
