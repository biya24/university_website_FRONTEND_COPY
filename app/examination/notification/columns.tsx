"use client";

import React from "react";

export const columns = [
    { key: "title", label: "Title", sortable: true },
    { key: "published_date_formatted", label: "Published", sortable: true },
    { key: "deadline_date_formatted", label: "Deadline", sortable: true },
    {
      key: "file_url",
      label: "Document",
      sortable: false,
      render: (row: any) =>
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
      render: (row: any) =>
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
  