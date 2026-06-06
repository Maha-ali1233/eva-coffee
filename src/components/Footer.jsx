import { Link } from "react-router-dom";

import { shop } from "../data/content";

export default function Footer({ variant = "dark" }) {
  const isDark = variant === "dark";

  return (
    <footer
      className={[
        "relative z-20 border-t",
        isDark
          ? "border-cream/10 bg-espresso text-cream/70"
          : "border-steam bg-cream text-roast/70",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p
            className={[
              "font-display text-2xl font-semibold",
              isDark ? "text-cream" : "text-espresso",
            ].join(" ")}
          >
            {shop.name}
          </p>
          <p className="mt-2 text-sm">
            {shop.address.street}, {shop.address.neighborhood}
            <br />
            {shop.address.city}, {shop.address.state} {shop.address.zip}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm md:items-end">
          <a href={`tel:${shop.phone.replace(/\D/g, "")}`} className="hover:text-latte transition-colors">
            {shop.phone}
          </a>
          <a href={`mailto:${shop.email}`} className="hover:text-latte transition-colors">
            {shop.email}
          </a>
          <p>{shop.instagram}</p>
        </div>

        <div className="flex gap-6 text-sm">
          <Link to="/about" className="hover:text-latte transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-latte transition-colors">
            Contact
          </Link>
        </div>
      </div>

      <div
        className={[
          "border-t px-6 py-4 text-center text-xs",
          isDark ? "border-cream/10 text-cream/40" : "border-steam text-roast/40",
        ].join(" ")}
      >
        © {new Date().getFullYear()} {shop.name}. All rights reserved.
      </div>
    </footer>
  );
}
