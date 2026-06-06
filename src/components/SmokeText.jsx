import { useEffect, useState } from "react";

export const CUP_PHRASES = [
  "so hot!",
  "hey, stop!",
  "drink fast!",
  "careful now…",
  "sip me!",
  "still steaming…",
];

export default function SmokeText({
  variant = "light",
  phrase = CUP_PHRASES[0],
  pop = false,
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={`smoke-text smoke-text--${variant} pointer-events-none relative flex items-center justify-center ${
        pop ? "smoke-pop" : ""
      }`}
      aria-hidden="true"
    >
      <div className="smoke-backdrop" aria-hidden="true" />
      <div className="smoke-wisp smoke-wisp-1" aria-hidden="true" />
      <div className="smoke-wisp smoke-wisp-2" aria-hidden="true" />
      <div className="smoke-wisp smoke-wisp-3" aria-hidden="true" />
      <div className="smoke-wisp smoke-wisp-4" aria-hidden="true" />
      <p
        key={phrase}
        className={`smoke-label font-display relative z-10 text-xl font-semibold italic whitespace-nowrap sm:text-2xl ${
          isDark ? "text-cream" : "text-espresso"
        }`}
      >
        {phrase}
      </p>
    </div>
  );
}

export function useSectionTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section-theme]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setTheme(visible[0].target.getAttribute("data-section-theme") || "light");
        }
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-35% 0px -35% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return theme;
}
