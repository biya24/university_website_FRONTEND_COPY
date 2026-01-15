export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

/* ---------------- HELPERS ---------------- */
function normalizeAlias(path: string) {
  return path.replace(/\/$/, "");
}

function titleFromSlug(slug: string[]) {
  return slug
    .join(" ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ---------------- FETCH ALL PAGES WITH PAGINATION ---------------- */
async function fetchAllPages(lang: "en" | "ml") {
  const langPrefix = lang === "ml" ? "/ml" : "";
  let allPages: any[] = [];
  let page = 0;
  const pageSize = 50;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${langPrefix}/jsonapi/node/page?page[limit]=${pageSize}&page[offset]=${
        page * pageSize
      }`,
      { cache: "no-store" }
    );
    if (!res.ok) break;

    const json = await res.json();
    if (json.data.length === 0) {
      hasMore = false;
      break;
    }

    allPages = allPages.concat(json.data);
    page++;
  }

  return allPages;
}

function findPageByAlias(allPages: any[], alias: string) {
  const normalizedAlias = normalizeAlias(alias);
  return allPages.find(
    (item) =>
      normalizeAlias(item.attributes?.path?.alias || "") === normalizedAlias
  );
}

/* ---------------- PAGE COMPONENT ---------------- */
export default async function DrupalPage({ params }: PageProps) {
  const { slug = [] } = await params;

  if (slug.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">Invalid page</h1>
      </main>
    );
  }

  const lang: "en" | "ml" = slug[0] === "ml" ? "ml" : "en";
  const contentSlug = lang === "ml" ? slug.slice(1) : slug;

  if (contentSlug.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">Invalid page</h1>
      </main>
    );
  }

  const alias = `/${contentSlug.join("/")}`;

  // Fetch all pages and find the one with matching alias
  const allPages = await fetchAllPages(lang);
  const page = findPageByAlias(allPages, alias);

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
  const drupalBase = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;
  const bodyHtml = page.attributes?.body?.value?.replace(
    /src="\/sites\//g,
    `src="${drupalBase}/sites/`
  ) ?? "";

  return (
    <main className="min-h-screen text-slate-900 bg-[#fdfcf8]">
  


      {/* HERO */}
      
      <section
  className="relative overflow-hidden text-white shadow-[0_6px_30px_rgba(0,0,0,0.35)]
             bg-[linear-gradient(90deg,#1a0b12,#711F45,#5a1635)] bg-[length:200%_200%] animate-heroGradient"
>

        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-sm text-white/70">
            Home <span className="mx-2">/</span> {title}
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight
                   drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
      {title}
    </h1>


        </div>
        
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-16">

      <article
  className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
  style={{
    backgroundImage: "url('/images/bg_4.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* subtle inner paper overlay */}
  <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />

  {/* content */}
  <div className="relative z-10 p-6 md:p-10">
    <div
      className="drupal-body prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  </div>
</article>

      </section>

      {/* Drupal HTML Styling */}
      <style>{`
        .drupal-body { text-align: justify; text-justify: inter-word; background: transparent; line-height: 1.75;
  letter-spacing: 0.01em;}
        .drupal-body h1 { font-weight: 900; font-size: 2rem; line-height: 1.2; margin-top: 1.6rem; margin-bottom: 0.8rem; color: #0f172a; border-bottom: 3px solid #f59e0b; padding-bottom: 0.4rem; }
        .drupal-body h2 { font-weight: 900; letter-spacing: -0.01em; margin-top: 1.8rem; margin-bottom: 0.65rem; border-left: 6px solid #f59e0b; padding-left: 0.85rem; }
        .drupal-body h3 { font-weight: 800; margin-top: 1.2rem; margin-bottom: 0.4rem; }
        .drupal-body p { margin-top: 0.75rem; margin-bottom: 0.75rem; color: #1f2937; }
        .drupal-body a { color: #b45309; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
        .drupal-body ul, .drupal-body ol { margin-top: 0.7rem; margin-bottom: 0.7rem; }
        .drupal-body table { width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; margin: 1.2rem 0; }
        .drupal-body th, .drupal-body td { padding: 0.85rem; border-bottom: 1px solid #e5e7eb; }
        .drupal-body th { background: #f8fafc; font-weight: 900; }
        .drupal-body img { max-width: 100%; height: auto; border-radius: 18px; margin: 1rem 0; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
        .drupal-body blockquote { background: #fff7ed; border-left: 6px solid #f59e0b; border-radius: 16px; padding: 1rem 1.2rem; }
      `}</style>
    </main>
  );
}
