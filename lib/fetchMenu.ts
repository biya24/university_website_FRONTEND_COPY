export async function fetchMenu(menuName: string, lang: string = "en") {
  const langPrefix = lang === "ml" ? "/ml" : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${langPrefix}/jsonapi/menu_items/${menuName}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Response status:", res.status, res.statusText);
    throw new Error(`Failed to fetch ${menuName} menu`);
  }

  const json = await res.json();
  const items = json.data;

  // Normalize URL
  const cleanUrl = (url: string) => {
    if (!url) return "#";
    return url.replace("internal:", "").trim();
  };

  // Convert to simple objects
  const mapped = items.map((item: any) => ({
    id: item.id,
    parent: item.attributes.parent || null,
    title: item.attributes.title,
    url: cleanUrl(item.attributes.url),
    children: [],
  }));

  // Build menu tree
  const lookup: Record<string, any> = {};
  mapped.forEach((item) => (lookup[item.id] = item));

  const rootItems: any[] = [];

  mapped.forEach((item) => {
    if (item.parent && lookup[item.parent]) {
      lookup[item.parent].children.push(item);
    } else {
      rootItems.push(item);
    }
  });

  return rootItems;
}
