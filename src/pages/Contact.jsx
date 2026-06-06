import { useState } from "react";

import CoffeeImage from "../components/CoffeeImage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { contact, shop } from "../data/content";
import { images } from "../data/images";

const FORM_NAME = "contact";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.target;
    const body = new URLSearchParams(new FormData(form)).toString();

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar variant="light" />

      <div className="relative h-48 overflow-hidden sm:h-56">
        <CoffeeImage
          src={images.storefront.src}
          alt={images.storefront.alt}
          loading="eager"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent" />
      </div>

      <main className="mx-auto max-w-2xl px-6 pt-10 pb-28">
        <p className="text-[11px] tracking-[0.28em] text-mocha uppercase">Contact</p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-espresso md:text-5xl">
          {contact.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-roast/75">{contact.intro}</p>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div className="space-y-8 text-sm">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-roast/40 uppercase">
                Address
              </p>
              <p className="mt-2 leading-relaxed text-espresso">
                {shop.address.street}
                <br />
                {shop.address.neighborhood}
                <br />
                {shop.address.city}, {shop.address.state} {shop.address.zip}
              </p>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] text-roast/40 uppercase">
                Phone & email
              </p>
              <p className="mt-2 space-y-1">
                <a
                  href={`tel:${shop.phone.replace(/\D/g, "")}`}
                  className="block text-espresso transition hover:text-mocha"
                >
                  {shop.phone}
                </a>
                <a
                  href={`mailto:${shop.email}`}
                  className="block text-espresso transition hover:text-mocha"
                >
                  {shop.email}
                </a>
              </p>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] text-roast/40 uppercase">
                Hours
              </p>
              <ul className="mt-2 space-y-1.5 text-espresso">
                {shop.hours.map((row) => (
                  <li key={row.days} className="flex justify-between gap-4">
                    <span>{row.days}</span>
                    <span className="text-roast/50">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="rounded-sm border border-latte/30 bg-steam/60 p-8 text-center">
                <p className="font-display text-xl text-espresso">Message received</p>
                <p className="mt-2 text-sm text-roast/60">
                  We&apos;ll get back to you within a business day.
                </p>
              </div>
            ) : (
              <form
                name={FORM_NAME}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out:
                    <input name="bot-field" />
                  </label>
                </p>

                <p className="text-xs leading-relaxed text-roast/50">{contact.formNote}</p>

                {["name", "email"].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="sr-only">
                      {field}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      required
                      disabled={submitting}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="w-full border-b border-roast/15 bg-transparent py-3 text-espresso placeholder:text-roast/30 focus:border-mocha focus:outline-none disabled:opacity-50"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    disabled={submitting}
                    placeholder="Message"
                    className="w-full resize-none border-b border-roast/15 bg-transparent py-3 text-espresso placeholder:text-roast/30 focus:border-mocha focus:outline-none disabled:opacity-50"
                  />
                </div>

                {error ? (
                  <p className="text-sm text-red-700/80" role="alert">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-espresso py-3.5 text-[11px] tracking-[0.22em] text-cream uppercase transition hover:bg-mocha disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  );
}
