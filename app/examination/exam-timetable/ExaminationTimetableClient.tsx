"use client";

import { useState, useMemo } from "react";

interface ResultItem {
  id: number;
  title: string;
  description?: string;
  published_date_formatted: string;
  file_url?: string | null;
  external_link?: string | null;
}

export default function ExaminationTimetableClient({
  data,
}: {
  data: ResultItem[];
}) {
  const ITEMS_PER_PAGE = 10;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* ---------- SEARCH FILTER ---------- */
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, page]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <article className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-10">

          {/* SEARCH BAR */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search examination timetable..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full md:w-96 rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#711F45]"
            />

            <span className="text-sm text-gray-500">
              Showing {paginatedData.length} of {filteredData.length}
            </span>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Title</th>
                  <th className="px-4 py-3 text-left font-bold">Published</th>
                  <th className="px-4 py-3 text-left font-bold">Document</th>
                  <th className="px-4 py-3 text-left font-bold">Link</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No records found
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="px-4 py-3">
                        <strong>{r.title}</strong>
                        {r.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {r.description}
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {r.published_date_formatted}
                      </td>

                      <td className="px-4 py-3">
                        {r.file_url ? (
                          <a
                            href={r.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#b45309] font-semibold underline"
                          >
                            Download
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {r.external_link ? (
                          <a
                            href={r.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#b45309] font-semibold underline"
                          >
                            Open
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
