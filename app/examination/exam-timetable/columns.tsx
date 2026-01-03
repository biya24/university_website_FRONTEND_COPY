"use client";

import React from "react";
import { ExamTimetable } from "./types"; // optional type import

export const columns = [
  {
    key: "title",
    label: "Title", // <-- must be label, not header
    sortable: true,
    render: (row: ExamTimetable & { description?: string }) => (
      <>
        <strong>{row.title}</strong>
        {row.description && (
          <p className="text-sm mt-1">{row.description}</p>
        )}
      </>
    ),
  },
  {
    key: "published_date_formatted",
    label: "Published",
    sortable: true,
  },
  {
    key: "deadline_date_formatted",
    label: "Deadline",
    sortable: true,
  },
  {
    key: "file_url",
    label: "Document",
    sortable: false,
    render: (row: ExamTimetable) =>
      row.file_url ? (
        <a
          href={row.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Download
        </a>
      ) : (
        "-"
      ),
  },
  {
    key: "external_link",
    label: "External Link",
    sortable: false,
    render: (row: ExamTimetable) =>
      row.external_link ? (
        <a
          href={row.external_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Open
        </a>
      ) : (
        "-"
      ),
  },
];
