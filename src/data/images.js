/** Local images in /public/images — sourced from Pexels & Unsplash */

const local = (file) => `/images/${file}`;

export const images = {
  heroBg: {
    src: local("hero-beans.jpg"),
    alt: "Freshly roasted coffee beans",
  },
  cafeInterior: {
    src: local("cafe-interior.jpg"),
    alt: "Warm light inside a coffee shop",
  },
  baristaPour: {
    src: local("barista.jpg"),
    alt: "Barista pouring coffee",
  },
  latteArt: {
    src: local("latte-art.jpg"),
    alt: "Latte with rosetta art",
  },
  pourOver: {
    src: local("pour-over.jpg"),
    alt: "Hand pour-over coffee brewing",
  },
  coldBrew: {
    src: local("images.jpeg"),
    alt: "Silky coffee in a ceramic cup with cinnamon",
  },
  mocha: {
    src: local("mochacoffee.webp"),
    alt: "Mocha coffee with chocolate and cream",
  },
  beans: {
    src: local("beans.jpg"),
    alt: "Close-up of roasted coffee beans",
  },
  storefront: {
    src: local("storefront.jpg"),
    alt: "Cozy café seating by a window",
  },
  team: {
    src: local("team.jpg"),
    alt: "Baristas working behind the café counter",
  },
};

export const gallery = [
  images.latteArt,
  images.pourOver,
  images.cafeInterior,
  images.beans,
  images.baristaPour,
  images.storefront,
];

export const drinkImages = {
  "Eva's Signature Latte": images.latteArt,
  "Village Cold Brew": images.coldBrew,
  "Ethiopian Pour Over": images.pourOver,
  "Mocha Noir": images.mocha,
};
