"use client";

import { useEffect, useState } from "react";

export default function BrandColorSelector() {
  const [primary, setPrimary] = useState("#023e8a");
  const [titleBg, setTitleBg] = useState("#0077b6");
  const [pageBg, setPageBg] = useState("#f1f7ff");
  const [cardBg, setCardBg] = useState("#e6f0ff");

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--color-brand-primary", primary);
    root.style.setProperty("--color-brand-secondary", titleBg);
    root.style.setProperty("--color-page-bg", pageBg);
    root.style.setProperty("--color-card-bg", cardBg);
  }, [primary, titleBg, pageBg, cardBg]); // ✅ IMPORTANT

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="w-28 text-sm">Primary</label>
        <input type="color" value={primary} onChange={e => setPrimary(e.target.value)} />
      </div>

      <div className="flex items-center gap-3">
        <label className="w-28 text-sm">Title BG</label>
        <input type="color" value={titleBg} onChange={e => setTitleBg(e.target.value)} />
      </div>

      <div className="flex items-center gap-3">
        <label className="w-28 text-sm">Page BG</label>
        <input type="color" value={pageBg} onChange={e => setPageBg(e.target.value)} />
      </div>

      <div className="flex items-center gap-3">
        <label className="w-28 text-sm">Card BG</label>
        <input type="color" value={cardBg} onChange={e => setCardBg(e.target.value)} />
      </div>
    </div>
  );
}
