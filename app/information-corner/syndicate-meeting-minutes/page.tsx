import DataTableClient from "../../components/DataTableClient";
import { columns } from "./columns";

const TITLE = "Syndicate Meeting Minutes";

async function fetchSyndicateMinutes() {
  const res = await fetch(
    "https://departments.ssus.ac.in/api/website/category/syndicate_minutes",
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function SyndicateMinutesPage() {
  const minutes = await fetchSyndicateMinutes();

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

      {/* TABLE SECTION */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <DataTableClient
          data={minutes}
          columns={columns}
          searchKeys={["title"]}
          dateFilterKeys={{ from: "published_date", to: "published_date" }}
          pageSizeOptions={[10, 25, 50]}
          defaultPageSize={10}
        />
      </div>
    </main>
  );
}
