import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { shop } from "../data/content";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ variant = "dark" }) {
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    [
      "block py-2 text-base tracking-wide transition-colors md:inline md:py-0 md:text-sm",
      isDark
        ? isActive
          ? "text-latte"
          : "text-cream/80 hover:text-cream"
        : isActive
          ? "text-mocha"
          : "text-roast/70 hover:text-roast",
    ].join(" ");

  return (
    <header
      className={[
        "fixed top-0 right-0 left-0 z-50 transition-colors duration-500",
        isDark ? "bg-espresso/80 backdrop-blur-md" : "bg-cream/90 backdrop-blur-md border-b border-steam",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:py-5">
        <Link
          to="/"
          className={[
            "font-display text-2xl font-semibold tracking-tight",
            isDark ? "text-cream" : "text-espresso",
          ].join(" ")}
          onClick={() => setOpen(false)}
        >
          {shop.name}
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={linkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={[
            "flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden",
            isDark ? "text-cream" : "text-espresso",
          ].join(" ")}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          className={[
            "fixed inset-0 top-[65px] z-40 md:hidden",
            isDark ? "bg-espresso" : "bg-cream",
          ].join(" ")}
        >
          <ul className="flex flex-col gap-1 px-6 py-8">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
