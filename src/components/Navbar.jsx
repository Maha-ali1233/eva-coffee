import { useState } from "react";
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

  const linkClass = ({ isActive }) =>
    [
      "text-sm tracking-wide transition-colors",
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
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          className={[
            "font-display text-2xl font-semibold tracking-tight",
            isDark ? "text-cream" : "text-espresso",
          ].join(" ")}
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
            "md:hidden text-sm uppercase tracking-widest",
            isDark ? "text-cream" : "text-espresso",
          ].join(" ")}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div
          className={[
            "border-t px-6 py-6 md:hidden",
            isDark ? "border-cream/10 bg-espresso" : "border-steam bg-cream",
          ].join(" ")}
        >
          <ul className="flex flex-col gap-4">
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
