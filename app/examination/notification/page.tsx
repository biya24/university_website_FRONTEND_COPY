import DataTableClient from "../../components/DataTableClient";
import { columns } from "./columns";

const TITLE = "Examination Notifications";

async function fetchResults() {
  const res = await fetch(
    "https://departments.ssus.ac.in/api/website/category/exam_notifications",
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function ExaminationNotificationPage() {
  const results = await fetchResults();

  return (
    <main className="min-h-screen bg-slate-50">
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

      {/* CLIENT TABLE */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <DataTableClient
          data={results}
          columns={columns}
          searchKeys={["title"]}
          pageSizeOptions={[10, 25, 50]}
          defaultPageSize={10}
          dateKey="published_date"
        />
      </div>
    </main>
  );
}
