import CoffeeImage from "../components/CoffeeImage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { about, shop } from "../data/content";
import { gallery, images } from "../data/images";

export default function About() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar variant="light" />

      <div className="relative h-64 overflow-hidden sm:h-80">
        <CoffeeImage
          src={images.team.src}
          alt={images.team.alt}
          loading="eager"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
      </div>

      <main className="mx-auto max-w-2xl px-6 pt-10 pb-28">
        <p className="text-[11px] tracking-[0.28em] text-mocha uppercase">
          {shop.address.neighborhood}, NYC
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-espresso md:text-5xl">
          {about.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-roast/75">{about.intro}</p>

        <div className="mt-10 space-y-6 text-base leading-[1.75] text-roast/70">
          {about.body.map((paragraph) => (
            <p key={paragraph.slice(0, 30)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3">
          {gallery.slice(0, 4).map((img) => (
            <div key={img.alt} className="aspect-square overflow-hidden rounded-sm">
              <CoffeeImage src={img.src} alt={img.alt} className="h-full w-full" />
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-steam pt-10">
          <h2 className="font-display text-xl font-medium text-espresso">The team</h2>
          <ul className="mt-6 divide-y divide-steam">
            {about.team.map((member) => (
              <li
                key={member.name}
                className="flex items-baseline justify-between py-4"
              >
                <span className="font-medium text-espresso">{member.name}</span>
                <span className="text-sm text-roast/50">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-16 text-sm text-roast/45">
          Est. {shop.founded} · {shop.address.street}, {shop.address.city}
        </p>
      </main>

      <Footer variant="light" />
    </div>
  );
}
