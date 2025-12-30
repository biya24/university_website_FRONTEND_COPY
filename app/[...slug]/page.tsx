interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

async function fetchDrupalPageByAlias(
  alias: string,
  lang: "en" | "ml"
) {
  const langPrefix = lang === "ml" ? "/ml" : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${langPrefix}/jsonapi/node/page`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const json = await res.json();

  return json.data.find(
    (item: any) => item.attributes?.path?.alias === alias
  );
}

function titleFromSlug(slug: string[]) {
  return slug
    .join(" ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function DrupalPage({ params }: PageProps) {
  const { slug = [] } = await params;

  if (slug.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">Invalid page</h1>
      </main>
    );
  }

  /* ---------------- LANGUAGE DETECTION ---------------- */
  const lang: "en" | "ml" = slug[0] === "ml" ? "ml" : "en";

  // Remove language from slug before Drupal lookup
  const contentSlug = lang === "ml" ? slug.slice(1) : slug;

  if (contentSlug.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">Invalid page</h1>
      </main>
    );
  }

  const alias = `/${contentSlug.join("/")}`;
  const page = await fetchDrupalPageByAlias(alias, lang);

  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <h1 className="text-2xl font-bold">Page not found</h1>
          <p className="mt-2 text-gray-500">
            Drupal page alias not found:{" "}
            <span className="font-mono">{alias}</span>
          </p>
        </div>
      </main>
    );
  }

  const title =
    page.attributes?.title ?? titleFromSlug(contentSlug);
  const bodyHtml = page.attributes?.body?.value ?? "";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
    
   {/* HERO */}
<section className="bg-gradient-to-r from-black to-[#711F45] text-white">
  <div className="mx-auto max-w-6xl px-6 py-12">
    <div className="text-sm text-white/70">
      Home <span className="mx-2">/</span> {title}
    </div>

    <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
      {title}
    </h1>
  </div>
</section>

   
     {/* CONTENT */}
     <section className="mx-auto max-w-6xl px-6 py-10">
        <article className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-10">
            <div
              className="drupal-body prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </div>
        </article>
      </section>

    {/* Drupal HTML Styling */}
    <style>{`
      .drupal-body{
        text-align: justify;
        text-justify: inter-word;
      }

      .drupal-body h1{
  font-weight: 900;
  font-size: 2rem;
  line-height: 1.2;
  margin-top: 1.6rem;
  margin-bottom: 0.8rem;
  color: #0f172a; /* slate-900 */
  border-bottom: 3px solid #f59e0b;
  padding-bottom: 0.4rem;
}


      .drupal-body h2{
        font-weight: 900;
        letter-spacing: -0.01em;
        margin-top: 1.8rem;
        margin-bottom: 0.65rem;
        border-left: 6px solid #f59e0b;
        padding-left: 0.85rem;
      }

      .drupal-body h3{
        font-weight: 800;
        margin-top: 1.2rem;
        margin-bottom: 0.4rem;
      }

      .drupal-body p{
        margin-top: 0.75rem;
        margin-bottom: 0.75rem;
        color: #1f2937;
      }

      .drupal-body a{
        color: #b45309;
        font-weight: 700;
        text-decoration: underline;
        text-underline-offset: 3px;
      }

      .drupal-body ul,
      .drupal-body ol{
        margin-top: 0.7rem;
        margin-bottom: 0.7rem;
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
      }

      .drupal-body th{
        background: #f8fafc;
        font-weight: 900;
      }

      .drupal-body img{
        max-width: 100%;
        height: auto;
        border-radius: 18px;
        margin: 1rem 0;
        box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      }

      .drupal-body blockquote{
        background: #fff7ed;
        border-left: 6px solid #f59e0b;
        border-radius: 16px;
        padding: 1rem 1.2rem;
      }
    `}</style>
  </main>
  );
}
