const TITLE = "Examination Results";

async function fetchResults() {
  const res = await fetch(
    "https://departments.ssus.ac.in/api/website/category/exam_results",
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const json = await res.json();
  return json.data || [];
}

export default async function ExaminationResultsPage() {
  const results = await fetchResults();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-r from-black to-[#711F45] text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-sm text-white/70">
            Home <span className="mx-2">/</span> {TITLE}
          </div>

          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            {TITLE}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <article className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-10">
            <div className="drupal-body prose prose-lg max-w-none">
              {results.length === 0 ? (
                <p>No examination results available at present.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Published</th>
                      
                      <th>Document</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r: any) => (
                      <tr key={r.id}>
                        <td>
                          <strong>{r.title}</strong>
                          {r.description && (
                            <p className="mt-1 text-sm">
                              {r.description}
                            </p>
                          )}
                        </td>

                        <td>{r.published_date_formatted}</td>

                        

                        <td>
                          {r.file_url ? (
                            <a
                              href={r.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>

                        <td>
                          {r.external_link ? (
                            <a
                              href={r.external_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Open
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </article>
      </section>

      {/* SAME STYLING AS DRUPAL PAGES */}
      <style>{`
        .drupal-body{
          text-align: justify;
          text-justify: inter-word;
        }

        .drupal-body table{
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          overflow: hidden;
          margin: 1.2rem 0;
        }

        .drupal-body th,
        .drupal-body td{
          padding: 0.85rem;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: top;
        }

        .drupal-body th{
          background: #f8fafc;
          font-weight: 900;
          text-align: left;
        }

        .drupal-body a{
          color: #b45309;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>
    </main>
  );
}
