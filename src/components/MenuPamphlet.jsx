import { useCallback, useEffect, useState } from "react";

import { menuPamphlet, shop } from "../data/content";

const SECTIONS = menuPamphlet.sections;

const SPREADS = [SECTIONS.slice(0, 2), SECTIONS.slice(2, 4)];

const DESKTOP_PAGE_COUNT = SPREADS.length + 1;
const MOBILE_PAGE_COUNT = SECTIONS.length + 1;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

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
              <p className="mt-0.5 text-xs leading-snug text-roast/50 sm:text-[11px]">
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

function MenuSectionPage({ section }) {
  return (
    <>
      <header className="mb-4 shrink-0 sm:mb-5">
        <h3 className="font-display border-b border-roast/15 pb-2 text-xl font-semibold text-espresso sm:text-2xl">
          {section.title}
        </h3>
      </header>
      <div className="min-h-0 flex-1">
        <MenuItems items={section.items} />
      </div>
      {section.id === "croissants" && (
        <footer className="mt-4 shrink-0 border-t border-roast/10 pt-3 text-center">
          <p className="text-[10px] tracking-widest text-roast/35 uppercase">
            Prices in USD · Dairy alternatives available
          </p>
        </footer>
      )}
    </>
  );
}

function DesktopCoverLeft() {
  return (
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
  );
}

function MobileCover({ onBrowse }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-[#f7f0e6] p-5 sm:p-6">
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

      <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
        <p className="font-display text-4xl font-semibold text-espresso">Menu</p>
        <p className="mt-3 text-sm text-roast/50">
          Coffee · Frappes · Drinks · Pastries
        </p>
        <p className="font-display mt-6 text-lg italic text-roast/45">{shop.tagline}</p>
        <button
          type="button"
          onClick={onBrowse}
          className="mt-8 min-h-[44px] border border-espresso/25 px-8 py-3 text-[11px] tracking-[0.2em] text-espresso uppercase transition hover:bg-espresso hover:text-cream"
        >
          Browse menu →
        </button>
      </div>
    </div>
  );
}

function DesktopSpread({ spread, onOpenMenu }) {
  const isCover = spread === 0;
  const leftSection = isCover ? null : SPREADS[spread - 1][0];
  const rightSection = isCover ? null : SPREADS[spread - 1][1];

  return (
    <div className="relative flex h-[540px]">
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-roast/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-roast/8 to-transparent"
        aria-hidden="true"
      />

      <div className="flex w-1/2 flex-col border-r border-roast/10 bg-[#f7f0e6] p-6 sm:p-8">
        {isCover ? (
          <DesktopCoverLeft />
        ) : (
          <MenuSectionPage section={leftSection} />
        )}
      </div>

      <div className="flex w-1/2 flex-col bg-cream p-6 sm:p-8">
        {isCover ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="font-display text-4xl font-semibold text-espresso">Menu</p>
            <p className="mt-3 text-sm text-roast/50">
              Coffee · Frappes · Drinks · Pastries
            </p>
            <button
              type="button"
              onClick={onOpenMenu}
              className="mt-8 border border-espresso/25 px-6 py-2.5 text-[11px] tracking-[0.2em] text-espresso uppercase transition hover:bg-espresso hover:text-cream"
            >
              Open menu →
            </button>
          </div>
        ) : (
          <MenuSectionPage section={rightSection} />
        )}
      </div>
    </div>
  );
}

function MobilePage({ page, onBrowse }) {
  if (page === 0) {
    return <MobileCover onBrowse={onBrowse} />;
  }

  const section = SECTIONS[page - 1];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-cream p-5 sm:p-6">
      <MenuSectionPage section={section} />
    </div>
  );
}

export default function MenuPamphlet({ open, onClose }) {
  const isDesktop = useIsDesktop();
  const [page, setPage] = useState(0);
  const [flip, setFlip] = useState(null);

  const pageCount = isDesktop ? DESKTOP_PAGE_COUNT : MOBILE_PAGE_COUNT;

  useEffect(() => {
    if (open) setPage(0);
  }, [open]);

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const turnPage = useCallback(
    (direction) => {
      if (flip) return;
      const next = direction === "next" ? page + 1 : page - 1;
      if (next < 0 || next >= pageCount) return;

      setFlip(direction);
      setTimeout(() => setPage(next), 240);
      setTimeout(() => setFlip(null), 480);
    },
    [flip, page, pageCount]
  );

  const goToPage = useCallback(
    (index) => {
      if (flip || index === page) return;
      if (index < 0 || index >= pageCount) return;

      const direction = index > page ? "next" : "prev";
      setFlip(direction);
      setTimeout(() => setPage(index), 240);
      setTimeout(() => setFlip(null), 480);
    },
    [flip, page, pageCount]
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
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

      <div className="menu-pamphlet-open relative z-[1] flex max-h-[100dvh] w-full flex-col sm:max-w-3xl">
        <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:mb-3 sm:px-1 sm:py-0">
          {!isDesktop && page > 0 ? (
            <p className="text-[11px] tracking-[0.18em] text-cream/60 uppercase">
              {SECTIONS[page - 1]?.title}
            </p>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-2 text-[11px] tracking-[0.2em] text-cream/70 uppercase transition hover:text-cream"
          >
            Close ×
          </button>
        </div>

        <div className="perspective-[1600px] min-h-0 flex-1 px-3 pb-3 sm:px-0 sm:pb-0">
          <div
            className={[
              "menu-book-spread h-full overflow-hidden rounded-t-sm shadow-2xl ring-1 ring-roast/10 sm:rounded-sm",
              flip === "next" ? "menu-flip-next" : "",
              flip === "prev" ? "menu-flip-prev" : "",
            ].join(" ")}
          >
            {isDesktop ? (
              <DesktopSpread
                spread={page}
                onOpenMenu={() => turnPage("next")}
              />
            ) : (
              <div className="h-[min(78dvh,680px)]">
                <MobilePage page={page} onBrowse={() => turnPage("next")} />
              </div>
            )}
          </div>
        </div>

        <nav className="flex shrink-0 items-center justify-between gap-3 px-4 py-4 sm:mt-5 sm:px-1 sm:py-0">
          <button
            type="button"
            onClick={() => turnPage("prev")}
            disabled={page === 0 || !!flip}
            className="min-h-[44px] shrink-0 text-[11px] tracking-[0.18em] text-cream/60 uppercase transition enabled:hover:text-cream disabled:opacity-30"
          >
            ← Prev
          </button>

          <div className="flex max-w-[50%] flex-wrap items-center justify-center gap-1.5 sm:max-w-none sm:gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                disabled={!!flip}
                className={`h-2 rounded-full transition-all sm:h-1.5 ${
                  i === page ? "w-6 bg-latte" : "w-2 bg-cream/35 hover:bg-cream/55 sm:w-1.5"
                }`}
                aria-label={`Page ${i + 1} of ${pageCount}`}
                aria-current={i === page ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => turnPage("next")}
            disabled={page >= pageCount - 1 || !!flip}
            className="min-h-[44px] shrink-0 text-[11px] tracking-[0.18em] text-cream/60 uppercase transition enabled:hover:text-cream disabled:opacity-30"
          >
            Next →
          </button>
        </nav>
      </div>
    </div>
  );
}
