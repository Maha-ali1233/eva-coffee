import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import CoffeeCupCanvas, {
  StickyCoffeeCup,
  useScrollProgress,
} from "../components/CoffeeCupCanvas";
import CoffeeImage, { ImageBand } from "../components/CoffeeImage";
import FadeIn from "../components/FadeIn";
import Footer from "../components/Footer";
import MenuPamphlet from "../components/MenuPamphlet";
import Navbar from "../components/Navbar";
import {
  drinks,
  hero,
  shop,
  story,
  testimonials,
  values,
} from "../data/content";
import { drinkImages, gallery, images } from "../data/images";

function SectionLabel({ children, light = false }) {
  return (
    <p
      className={`mb-3 text-[11px] tracking-[0.28em] uppercase ${
        light ? "text-latte" : "text-mocha"
      }`}
    >
      {children}
    </p>
  );
}

function ContentWrap({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-6 lg:w-[50%] lg:max-w-none lg:pl-12 lg:pr-8 xl:pl-16 ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const scrollRef = useScrollProgress(containerRef);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div ref={containerRef} className="relative">
      <Navbar variant="dark" />
      <StickyCoffeeCup scrollRef={scrollRef} />
      <MenuPamphlet open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        {/* Hero */}
        <section className="relative min-h-[100svh] overflow-hidden bg-espresso" data-section-theme="dark">
          <div className="pointer-events-none absolute inset-0 lg:left-[45%]">
            <CoffeeImage
              src={images.heroBg.src}
              alt={images.heroBg.alt}
              loading="eager"
              className="h-full w-full opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/90 to-espresso/40 lg:from-espresso lg:via-espresso/70 lg:to-transparent" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_50%,rgba(196,165,116,0.1),transparent)]" />

          <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 py-28 lg:w-[50%] lg:max-w-none lg:pl-12 lg:pr-8 xl:pl-16">
            <FadeIn>
              <SectionLabel light>{hero.eyebrow}</SectionLabel>
              <h1 className="font-display text-5xl leading-[1.06] font-semibold text-cream sm:text-6xl xl:text-[4.5rem]">
                {hero.headline}
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/60">
                {hero.subheadline}
              </p>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="mt-10 inline-block bg-latte px-8 py-3.5 text-[11px] tracking-[0.22em] text-espresso uppercase transition hover:bg-cream"
              >
                {hero.cta}
              </button>
            </FadeIn>
          </div>

          <div className="relative mx-auto h-72 w-full max-w-sm px-6 pb-16 lg:hidden">
            <CoffeeCupCanvas scrollRef={scrollRef} className="h-full w-full" />
          </div>
        </section>

        {/* Story */}
        <section id="story" className="bg-cream py-24 lg:py-32" data-section-theme="light">
          <ContentWrap>
            <FadeIn>
              <div className="mb-10 overflow-hidden rounded-sm">
                <CoffeeImage
                  src={images.cafeInterior.src}
                  alt={images.cafeInterior.alt}
                  aspect="aspect-[16/9]"
                  className="w-full"
                />
              </div>
              <SectionLabel>Our story</SectionLabel>
              <h2 className="font-display text-4xl font-semibold text-espresso lg:text-5xl">
                {story.title}
              </h2>
              <div className="mt-8 space-y-5 text-base leading-[1.75] text-roast/70">
                {story.paragraphs.map((p) => (
                  <p key={p.slice(0, 28)}>{p}</p>
                ))}
              </div>
            </FadeIn>
          </ContentWrap>
        </section>

        {/* Gallery strip */}
        <section className="border-y border-steam bg-cream py-6" aria-label="Coffee gallery" data-section-theme="light">
          <div className="flex gap-4 overflow-x-auto px-6 pb-2 lg:gap-5 lg:px-12">
            {gallery.map((img) => (
              <div
                key={img.alt}
                className="h-36 w-52 shrink-0 overflow-hidden rounded-sm sm:h-44 sm:w-64"
              >
                <CoffeeImage src={img.src} alt={img.alt} className="h-full w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Menu */}
        <section id="menu" className="border-b border-steam bg-steam/40 py-24 lg:py-32" data-section-theme="light">
          <ContentWrap>
            <FadeIn>
              <SectionLabel>The bar</SectionLabel>
              <h2 className="font-display mb-10 text-4xl font-semibold text-espresso lg:text-5xl">
                Signature drinks
              </h2>
            </FadeIn>
            <div className="grid gap-5 sm:grid-cols-2">
              {drinks.map((drink, i) => {
                const img = drinkImages[drink.name];
                return (
                  <FadeIn key={drink.name} delay={i * 80}>
                    <article className="group h-full overflow-hidden rounded-sm border border-roast/8 bg-cream transition-shadow hover:shadow-md">
                      {img && (
                        <div className="aspect-[4/3] overflow-hidden">
                          <CoffeeImage
                            src={img.src}
                            alt={img.alt}
                            className="h-full w-full transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-display text-xl font-medium text-espresso">
                            {drink.name}
                          </h3>
                          <span className="font-display text-lg text-mocha">
                            {drink.price}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-roast/65">
                          {drink.description}
                        </p>
                        <span className="mt-3 inline-block text-[10px] tracking-[0.2em] text-latte uppercase">
                          {drink.note}
                        </span>
                      </div>
                    </article>
                  </FadeIn>
                );
              })}
            </div>
          </ContentWrap>
        </section>

        {/* Full-bleed barista image */}
        <FadeIn>
          <ImageBand
            src={images.baristaPour.src}
            alt={images.baristaPour.alt}
            className="h-56 sm:h-72 lg:h-80"
          />
        </FadeIn>

        {/* Values */}
        <section className="relative overflow-hidden bg-espresso py-24 text-cream lg:py-32" data-section-theme="dark">
          <div className="pointer-events-none absolute inset-0 opacity-15">
            <CoffeeImage src={images.beans.src} alt="" className="h-full w-full" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-espresso/85" />
          <ContentWrap className="relative">
            <FadeIn>
              <SectionLabel light>What we stand for</SectionLabel>
              <h2 className="font-display mb-12 text-4xl font-semibold lg:text-5xl">
                More than a café
              </h2>
            </FadeIn>
            <div className="space-y-10">
              {values.map((item, i) => (
                <FadeIn key={item.title} delay={i * 100}>
                  <div className="border-t border-cream/12 pt-8">
                    <h3 className="font-display text-2xl font-medium text-latte">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/55">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </ContentWrap>
        </section>

        {/* Testimonials */}
        <section className="bg-cream py-24 lg:py-32" data-section-theme="light">
          <ContentWrap>
            <FadeIn>
              <SectionLabel>From our regulars</SectionLabel>
              <h2 className="font-display mb-12 text-4xl font-semibold text-espresso lg:text-5xl">
                Village voices
              </h2>
            </FadeIn>
            <div className="space-y-8">
              {testimonials.map((t, i) => (
                <FadeIn key={t.author} delay={i * 100}>
                  <blockquote className="border-l-2 border-latte pl-6">
                    <p className="text-lg leading-relaxed text-roast/75 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="mt-4">
                      <cite className="not-italic font-medium text-espresso">
                        {t.author}
                      </cite>
                      <span className="mx-2 text-roast/30">·</span>
                      <span className="text-sm text-roast/45">{t.role}</span>
                    </footer>
                  </blockquote>
                </FadeIn>
              ))}
            </div>
          </ContentWrap>
        </section>

        {/* Visit */}
        <section className="bg-steam py-24 lg:py-32" data-section-theme="light">
          <ContentWrap>
            <FadeIn>
              <div className="mb-10 overflow-hidden rounded-sm">
                <CoffeeImage
                  src={images.storefront.src}
                  alt={images.storefront.alt}
                  aspect="aspect-[16/9]"
                  className="w-full"
                />
              </div>
              <SectionLabel>Find us in NYC</SectionLabel>
              <h2 className="font-display text-4xl font-semibold text-espresso lg:text-5xl">
                {shop.address.street}
              </h2>
              <p className="mt-3 text-roast/65">
                {shop.address.neighborhood}, {shop.address.city},{" "}
                {shop.address.state} {shop.address.zip}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-espresso px-8 py-3.5 text-[11px] tracking-[0.22em] text-cream uppercase transition hover:bg-mocha"
                >
                  Get in touch
                </Link>
                <Link
                  to="/about"
                  className="border border-espresso/20 px-8 py-3.5 text-[11px] tracking-[0.22em] text-espresso uppercase transition hover:border-espresso"
                >
                  Our story
                </Link>
              </div>
            </FadeIn>
          </ContentWrap>
        </section>
      </main>

      <Footer variant="dark" />
    </div>
  );
}
