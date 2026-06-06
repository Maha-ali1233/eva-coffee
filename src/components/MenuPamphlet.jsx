import { useCallback, useEffect, useState } from "react";

import { menuPamphlet, shop } from "../data/content";

const SPREADS = [
  menuPamphlet.sections.slice(0, 2),
  menuPamphlet.sections.slice(2, 4),
];

const TOTAL_SPREADS = SPREADS.length + 1;

function MenuItems({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.name}
          className="flex gap-3 border-b border-roast/6 pb-3 last:border-0 last:pb-0"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-espresso">{item.name}</p>
            {item.description && (
              <p className="mt-0.5 text-[11px] leading-snug text-roast/50">
                {item.description}
              </p>
            )}
          </div>
          <span className="shrink-0 font-display text-sm text-mocha">{item.price}</span>
        </li>
      ))}
    </ul>
  );
}

function MenuPage({ section, isLeft, variant = "section" }) {
  return (
    <div
      className={`flex h-full w-full flex-col p-6 sm:p-8 ${
        isLeft ? "bg-[#f7f0e6]" : "bg-cream"
      }`}
    >
      {variant === "cover" && isLeft ? (
        <>
          <header className="border-b border-roast/10 pb-5 text-center">
            <p className="text-[10px] tracking-[0.35em] text-mocha uppercase">
              {menuPamphlet.subtitle}
            </p>
            <h2
              id="menu-pamphlet-title"
              className="font-display mt-2 text-3xl font-semibold text-espresso"
            >
              {menuPamphlet.title}
            </h2>
            <p className="mt-1 text-xs text-roast/45">{shop.address.street}</p>
          </header>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="font-display text-xl italic text-roast/45">{shop.tagline}</p>
            <p className="mt-4 text-[10px] tracking-[0.25em] text-roast/35 uppercase">
              Turn the page →
            </p>
          </div>
        </>
      ) : (
        <>
          <header className="mb-5">
            <h3 className="font-display border-b border-roast/15 pb-2 text-2xl font-semibold text-espresso">
              {section.title}
            </h3>
          </header>
          <div className="flex-1">
            <MenuItems items={section.items} />
          </div>
          {section.id === "croissants" && (
            <footer className="mt-4 border-t border-roast/10 pt-3 text-center">
              <p className="text-[10px] tracking-widest text-roast/35 uppercase">
                Prices in USD · Dairy alternatives available
              </p>
            </footer>
          )}
        </>
      )}
    </div>
  );
}

export default function MenuPamphlet({ open, onClose }) {
  const [spread, setSpread] = useState(0);
  const [flip, setFlip] = useState(null);

  const isCover = spread === 0;

  useEffect(() => {
    if (open) setSpread(0);
  }, [open]);

  const turnPage = useCallback(
    (direction) => {
      if (flip) return;
      const next = direction === "next" ? spread + 1 : spread - 1;
      if (next < 0 || next >= TOTAL_SPREADS) return;

      setFlip(direction);
      setTimeout(() => setSpread(next), 240);
      setTimeout(() => setFlip(null), 480);
    },
    [flip, spread]
  );

  const goToSpread = useCallback(
    (index) => {
      if (flip || index === spread) return;
      if (index < 0 || index >= TOTAL_SPREADS) return;

      const direction = index > spread ? "next" : "prev";
      setFlip(direction);
      setTimeout(() => setSpread(index), 240);
      setTimeout(() => setFlip(null), 480);
    },
    [flip, spread]
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") turnPage("next");
      if (e.key === "ArrowLeft") turnPage("prev");
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, turnPage]);

  if (!open) return null;

  const leftSection = isCover ? null : SPREADS[spread - 1][0];
  const rightSection = isCover ? null : SPREADS[spread - 1][1];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-pamphlet-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-espresso/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close menu"
      />

      <div className="menu-pamphlet-open relative z-[1] w-full max-w-3xl">
        <div className="mb-3 flex items-center justify-end px-1">
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] tracking-[0.2em] text-cream/70 uppercase transition hover:text-cream"
          >
            Close ×
          </button>
        </div>

        <div className="perspective-[1600px]">
          <div
            className={[
              "menu-book-spread overflow-hidden rounded-sm shadow-2xl ring-1 ring-roast/10",
              flip === "next" ? "menu-flip-next" : "",
              flip === "prev" ? "menu-flip-prev" : "",
            ].join(" ")}
          >
            <div className="relative flex h-[min(520px,72vh)] sm:h-[540px]">
              <div
                className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-roast/15"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-roast/8 to-transparent"
                aria-hidden="true"
              />

              <div className="w-1/2 border-r border-roast/10">
                {isCover ? (
                  <MenuPage section={{ title: "" }} isLeft variant="cover" />
                ) : (
                  <MenuPage section={leftSection} isLeft />
                )}
              </div>

              <div className="w-1/2">
                {isCover ? (
                  <div className="flex h-full flex-col items-center justify-center bg-cream p-6 text-center sm:p-8">
                    <p className="font-display text-4xl font-semibold text-espresso">Menu</p>
                    <p className="mt-3 text-sm text-roast/50">
                      Coffee · Frappes · Drinks · Pastries
                    </p>
                    <button
                      type="button"
                      onClick={() => turnPage("next")}
                      className="mt-8 border border-espresso/25 px-6 py-2.5 text-[11px] tracking-[0.2em] text-espresso uppercase transition hover:bg-espresso hover:text-cream"
                    >
                      Open menu →
                    </button>
                  </div>
                ) : (
                  <MenuPage section={rightSection} isLeft={false} />
                )}
              </div>
            </div>
          </div>
        </div>

        <nav className="mt-5 flex items-center justify-between px-1">
          <button
            type="button"
            onClick={() => turnPage("prev")}
            disabled={spread === 0 || !!flip}
            className="text-[11px] tracking-[0.18em] text-cream/60 uppercase transition enabled:hover:text-cream disabled:opacity-30"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_SPREADS }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSpread(i)}
                disabled={!!flip}
                className={`h-1.5 rounded-full transition-all ${
                  i === spread ? "w-6 bg-latte" : "w-1.5 bg-cream/35 hover:bg-cream/55"
                }`}
                aria-label={`Page ${i + 1} of ${TOTAL_SPREADS}`}
                aria-current={i === spread ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => turnPage("next")}
            disabled={spread >= TOTAL_SPREADS - 1 || !!flip}
            className="text-[11px] tracking-[0.18em] text-cream/60 uppercase transition enabled:hover:text-cream disabled:opacity-30"
          >
            Next →
          </button>
        </nav>
      </div>
    </div>
  );
}
