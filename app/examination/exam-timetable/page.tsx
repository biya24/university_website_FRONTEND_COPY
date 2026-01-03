import DataTableClient from "../../components/DataTableClient";
import { columns } from "./columns";

export default async function ExaminationTimetablePage() {
  const res = await fetch(
    "https://departments.ssus.ac.in/api/website/category/exam_timetables",
    { cache: "no-store" }
  );
  const json = await res.json();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-gradient-to-r from-black to-[#711F45] text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-3xl font-bold">Examination Timetable</h1>
        </div>
      </section>

      {/* DATA TABLE */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <DataTableClient
          data={json.data || []}           // pass your fetched data
          columns={columns}               // pass the columns we defined
          searchKeys={["title", "description"]}  // columns to search
          dateFilterKeys={{ from: "published_date", to: "deadline_date" }}
          pageSizeOptions={[10, 25, 50]}   // paging options
          defaultPageSize={10}            // first page shows 10 rows
        />
      </div>
    </main>
  );
}
