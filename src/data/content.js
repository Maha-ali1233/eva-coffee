export const shop = {
  name: "Eva Coffee",
  tagline: "Roasted with intention. Served with warmth.",
  address: {
    street: "142 Bleecker Street",
    neighborhood: "Greenwich Village",
    city: "New York",
    state: "NY",
    zip: "10012",
  },
  phone: "(212) 555-0147",
  email: "hello@evacoffee.nyc",
  hours: [
    { days: "Monday – Friday", time: "7:00 AM – 8:00 PM" },
    { days: "Saturday", time: "8:00 AM – 9:00 PM" },
    { days: "Sunday", time: "8:00 AM – 7:00 PM" },
  ],
  founded: 2019,
  instagram: "@evacoffee.nyc",
};

export const hero = {
  eyebrow: "Greenwich Village · Est. 2019",
  headline: "Every cup tells a story.",
  subheadline:
    "Single-origin beans, slow-poured lattes, and a corner of Bleecker Street that feels like home.",
  cta: "Explore the menu",
};

export const story = {
  title: "Born on Bleecker",
  paragraphs: [
    "Eva Coffee opened its doors on a rain-soaked October morning in 2019, named after founder Eva Morales's grandmother — a woman who believed the best conversations happened over a fresh pot.",
    "We source directly from small farms in Colombia, Ethiopia, and Guatemala, paying above fair-trade prices and visiting every origin at least once a year.",
    "Our baristas train for six weeks before pulling their first shot on the La Marzocco. It's not pretension — it's respect for the bean and for you.",
  ],
};

export const drinks = [
  {
    name: "Eva's Signature Latte",
    description: "Double ristretto, oat milk, touch of vanilla bean. Our bestseller since day one.",
    price: "$6.50",
    note: "Best seller",
  },
  {
    name: "Village Cold Brew",
    description: "18-hour steep, single-origin Colombian. Silky, chocolate-forward, zero bitterness.",
    price: "$5.75",
    note: "Seasonal",
  },
  {
    name: "Ethiopian Pour Over",
    description: "Yirgacheffe, bright citrus and jasmine. Hand-poured to order at the bar.",
    price: "$5.25",
    note: "Single origin",
  },
  {
    name: "Mocha Noir",
    description: "70% dark chocolate from Brooklyn, espresso, steamed whole milk.",
    price: "$6.25",
    note: "House favorite",
  },
];

export const values = [
  {
    title: "Direct trade",
    description: "We know our farmers by name. Every bag is traceable to the hectare.",
  },
  {
    title: "Zero waste goal",
    description: "Compostable cups, spent grounds to community gardens, no plastic since 2021.",
  },
  {
    title: "Neighborhood first",
    description: "Free refills for regulars, open-mic Thursdays, and a bulletin board that actually gets used.",
  },
];

export const testimonials = [
  {
    quote:
      "I've lived in the Village twenty years. Eva is the only place where the barista remembers my order and asks about my dog.",
    author: "Margaret K.",
    role: "Regular since 2019",
  },
  {
    quote:
      "The Ethiopian pour over changed what I thought coffee could taste like. Bright, floral, nothing like the burnt stuff elsewhere.",
    author: "James T.",
    role: "Coffee enthusiast",
  },
  {
    quote:
      "Perfect laptop spot — great Wi-Fi, outlets at every table, and they never rush you out.",
    author: "Priya S.",
    role: "NYU grad student",
  },
];

export const about = {
  title: "About Eva Coffee",
  intro:
    "We're a small, independent café on Bleecker Street — not a chain, not a concept, just really good coffee and people who care.",
  body: [
    "Eva Morales grew up in Queens watching her abuela brew café cubano on a stovetop moka pot. After a decade in specialty coffee — stints at Stumptown and a roastery in Bogotá — she saved enough to open a 900-square-foot shop in the Village with two friends from culinary school.",
    "Today, Eva Coffee employs fourteen people, roasts 400 pounds of beans weekly in Red Hook, and serves roughly 350 cups a day. We still use the same marble counter Eva sanded by hand the week before opening.",
  ],
  team: [
    { name: "Eva Morales", role: "Founder & Head Roaster" },
    { name: "Daniel Okonkwo", role: "Head Barista" },
    { name: "Sofia Reyes", role: "Pastry Chef" },
  ],
};

export const contact = {
  title: "Visit us",
  intro:
    "We're on the corner of Bleecker and Thompson — look for the green awning and the smell of fresh espresso.",
  formNote: "We read every message. For catering or wholesale inquiries, mention it in your note.",
};

export const menuPamphlet = {
  title: "Eva Coffee",
  subtitle: "Bleecker Street · Menu",
  sections: [
    {
      id: "coffee",
      title: "Coffee",
      items: [
        { name: "Espresso", price: "$3.50", description: "Double shot, single origin rotation" },
        { name: "Americano", price: "$4.00", description: "Espresso, hot water" },
        { name: "Eva's Signature Latte", price: "$6.50", description: "Ristretto, oat milk, vanilla bean" },
        { name: "Cappuccino", price: "$5.25", description: "Equal parts espresso, steamed milk, foam" },
        { name: "Flat White", price: "$5.50", description: "Velvet microfoam, 6 oz" },
        { name: "Ethiopian Pour Over", price: "$5.25", description: "Yirgacheffe, hand-poured to order" },
        { name: "Village Cold Brew", price: "$5.75", description: "18-hour steep, Colombian single origin" },
        { name: "Cortado", price: "$4.75", description: "Espresso cut with warm milk" },
      ],
    },
    {
      id: "frappes",
      title: "Frappes",
      items: [
        { name: "Classic Coffee Frappe", price: "$6.50", description: "Blended espresso, ice, whole milk" },
        { name: "Vanilla Bean Frappe", price: "$6.95", description: "Madagascar vanilla, espresso, whipped cream" },
        { name: "Mocha Frappe", price: "$7.25", description: "Dark chocolate, espresso, oat milk" },
        { name: "Caramel Frappe", price: "$7.25", description: "House caramel, espresso, ice" },
        { name: "Matcha Frappe", price: "$7.50", description: "Ceremonial grade matcha, vanilla, milk" },
        { name: "Seasonal Pumpkin Frappe", price: "$7.50", description: "Spiced, maple, espresso — fall only" },
      ],
    },
    {
      id: "drinks",
      title: "Drinks",
      items: [
        { name: "Fresh Orange Juice", price: "$4.50", description: "Squeezed to order" },
        { name: "House Iced Tea", price: "$3.75", description: "Black or green, lightly sweetened" },
        { name: "Sparkling Lemonade", price: "$4.25", description: "Still or sparkling" },
        { name: "Hot Chocolate", price: "$5.00", description: "70% Brooklyn dark chocolate" },
        { name: "Chai Latte", price: "$5.50", description: "House spice blend, steamed milk" },
        { name: "Golden Milk", price: "$5.25", description: "Turmeric, ginger, honey, oat milk" },
        { name: "San Pellegrino", price: "$3.00", description: "500 ml" },
        { name: "Maple Seltzer", price: "$3.50", description: "Local, rotating flavors" },
      ],
    },
    {
      id: "croissants",
      title: "Croissants",
      items: [
        { name: "Classic Butter", price: "$4.25", description: "Baked fresh every morning" },
        { name: "Almond", price: "$4.95", description: "Frangipane, sliced almonds, powdered sugar" },
        { name: "Chocolate", price: "$5.25", description: "Two bars of 70% dark chocolate" },
        { name: "Ham & Gruyère", price: "$6.50", description: "Savory, warmed on request" },
        { name: "Pain au Chocolat", price: "$4.75", description: "Flaky, twice-baked" },
        { name: "Blueberry Cream Cheese", price: "$5.50", description: "Weekly special — Sofia's recipe" },
      ],
    },
  ],
};
