export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  tagline: string;
  description: string;
  category: "signature" | "kahwa" | "bakery" | "street-bites" | "artisanal-tins";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  prepTime: string;
  calories?: string;
  spiciness: number; // 1 to 5
  sweetness: number; // 1 to 5
  caffeine: "Low" | "Medium" | "High" | "Zero";
  ingredients: string[];
  pairing: string;
  dietary: ("vegan" | "gluten-free" | "pure-ghee" | "chef-special")[];
  accentColor: string;
  iconName: string;
}

export const SIGNATURE_BREWS: MenuItem[] = [
  {
    id: "shahi-kesar-dum",
    name: "Shahi Kesar Dum Chai",
    hindiName: "शाही केसर दम चाय",
    tagline: "Slow-simmered brass handi chai infused with 24K Kashmiri Mogra Saffron",
    description: "Our crown jewel. CTC and orthodox Assam golden tips slow-boiled in a sealed handi with green cardamom, mace, and pure Pampore Kashmiri saffron, enriched with velvety full-cream buffalo milk.",
    category: "signature",
    price: 180,
    originalPrice: 220,
    rating: 4.9,
    reviewCount: 3420,
    badge: "Royal Bestseller",
    prepTime: "8 mins",
    calories: "160 kcal",
    spiciness: 2,
    sweetness: 3,
    caffeine: "High",
    ingredients: ["Kashmiri Mogra Saffron", "Upper Assam CTC", "Green Cardamom", "Javitri (Mace)", "Full Cream Milk", "Raw Khandsari"],
    pairing: "Pistachio Nankhatai or Warm Bun Maska",
    dietary: ["chef-special", "pure-ghee"],
    accentColor: "#F59E0B",
    iconName: "Sparkles"
  },
  {
    id: "banarasi-kulhad-masala",
    name: "Banarasi Kulhad Masala Chai",
    hindiName: "बनारसी कुल्हड़ मसाला",
    tagline: "18-spice silbatta crush in clay pot with fresh crushed ginger",
    description: "Stone-ground sun-dried ginger, black pepper, cinnamon, clove, and tulsi blended with strong Assam tea, served piping hot in unglazed Varanasi terracotta kulhads for an earthy signature aroma.",
    category: "signature",
    price: 140,
    rating: 4.95,
    reviewCount: 4890,
    badge: "Adda Essential",
    prepTime: "6 mins",
    calories: "140 kcal",
    spiciness: 4,
    sweetness: 2,
    caffeine: "High",
    ingredients: ["18-Spice Adda Churna", "Crushed Adrak (Ginger)", "Clove", "Black Pepper", "Darjeeling Broken Leaf", "Varanasi Clay"],
    pairing: "Hot Hing Kachori or Crunchy Matthi",
    dietary: ["chef-special"],
    accentColor: "#EA580C",
    iconName: "Flame"
  },
  {
    id: "kashmiri-saffron-kahwa",
    name: "Kashmiri Shahi Kahwa",
    hindiName: "कश्मीरी शाही कहवा",
    tagline: "Golden green tea steeped in a copper samovar with crushed almonds & rose",
    description: "Traditional Himalayan brew of Kashmiri whole-leaf green tea simmered with cinnamon bark, saffron strands, cardamom, dried wild rose petals, and slivered Mamra almonds. Naturally rejuvenating and milk-free.",
    category: "kahwa",
    price: 210,
    rating: 4.85,
    reviewCount: 1820,
    badge: "Winter Warmth",
    prepTime: "5 mins",
    calories: "65 kcal",
    spiciness: 1,
    sweetness: 2,
    caffeine: "Low",
    ingredients: ["Kashmiri Green Tea", "Mamra Almonds", "Wild Rose Petals", "Dalchini (Cinnamon)", "Kesar", "Raw Wild Honey"],
    pairing: "Almond Bakarkhani & Saffron Shortbread",
    dietary: ["vegan", "gluten-free", "chef-special"],
    accentColor: "#EAB308",
    iconName: "Sun"
  },
  {
    id: "kadak-tulsi-elaichi",
    name: "Kadak Tulsi Elaichi Chai",
    hindiName: "कड़क तुलसी इलायची चाय",
    tagline: "Immunity brew with Krishna Tulsi, Idukki green cardamom & whole milk",
    description: "A potent aromatic powerhouse featuring wild sacred Krishna Tulsi leaves, whole pods of fragrant Kerala cardamom, and robust double-fermented CTC tea. Crafted for deep focus and revitalizing energy.",
    category: "signature",
    price: 130,
    rating: 4.8,
    reviewCount: 2150,
    badge: "Adda Favorite",
    prepTime: "5 mins",
    calories: "125 kcal",
    spiciness: 2,
    sweetness: 2,
    caffeine: "High",
    ingredients: ["Krishna Tulsi", "Idukki Cardamom", "Assam CTC Grain", "A2 Desi Cow Milk", "Organic Jaggery"],
    pairing: "Ajwain Butter Biscuit",
    dietary: ["pure-ghee"],
    accentColor: "#10B981",
    iconName: "Shield"
  },
  {
    id: "irani-maska-karak",
    name: "Irani Karak Malai Chai",
    hindiName: "ईरानी कड़क मलाई चाय",
    tagline: "Thick double-condensed milk brew layered with clotted malai cream",
    description: "Inspired by legendary Bombay Irani cafes. Tea decoction brewed for 45 minutes in a separate copper urn, married with sweet caramelized reduced milk and topped with fresh clotted malai.",
    category: "signature",
    price: 160,
    rating: 4.9,
    reviewCount: 2980,
    badge: "Irani Classic",
    prepTime: "7 mins",
    calories: "210 kcal",
    spiciness: 1,
    sweetness: 4,
    caffeine: "High",
    ingredients: ["Slow Decoction Tea", "Slow-Reduced Sweet Milk", "Cardamom Infusion", "Fresh Malai Top"],
    pairing: "Warm Butter Brun Maska Bun",
    dietary: ["pure-ghee"],
    accentColor: "#D97706",
    iconName: "Coffee"
  },
  {
    id: "pahari-lemongrass-detox",
    name: "Pahari Lemongrass & Mulethi",
    hindiName: "पहाड़ी लेमनग्रास मुलेठी",
    tagline: "Clean mountain tisane with sweet liquorice root & fresh ginger",
    description: "Hand-plucked Himalayan lemongrass stems steeped with soothing Mulethi (liquorice root) and sun-dried ginger. Zero bitterness, inherently sweet without added sugar.",
    category: "kahwa",
    price: 150,
    rating: 4.75,
    reviewCount: 940,
    badge: "Caffeine Free",
    prepTime: "4 mins",
    calories: "20 kcal",
    spiciness: 1,
    sweetness: 2,
    caffeine: "Zero",
    ingredients: ["Wild Pahari Lemongrass", "Mulethi Root", "Sun Ginger", "Star Anise", "Spring Water"],
    pairing: "Baked Multigrain Crisp",
    dietary: ["vegan", "gluten-free"],
    accentColor: "#84CC16",
    iconName: "Leaf"
  }
];

export const FULL_MENU: MenuItem[] = [
  ...SIGNATURE_BREWS,
  // Bakery & Bites
  {
    id: "classic-bun-maska",
    name: "Truffle & Amul Bun Maska",
    hindiName: "ट्रफल अमूल बन मस्का",
    tagline: "Freshly baked soft sweet bun slathered with whipped butter & subtle truffle aroma",
    description: "Piping warm house-baked brioche-style bun generously filled with hand-whipped salted Amul butter, dusted with coarse raw sugar crystals.",
    category: "bakery",
    price: 110,
    rating: 4.9,
    reviewCount: 3100,
    badge: "Iconic Pairing",
    prepTime: "3 mins",
    spiciness: 0,
    sweetness: 2,
    caffeine: "Zero",
    ingredients: ["Stone-milled Flour", "Amul Cultured Butter", "Cane Sugar", "Truffle Essence"],
    pairing: "Banarasi Kulhad Masala Chai",
    dietary: ["pure-ghee"],
    accentColor: "#FBBF24",
    iconName: "Bread"
  },
  {
    id: "pistachio-pista-nankhatai",
    name: "Royal Pista Nankhatai (Box of 4)",
    hindiName: "शाही पिस्ता नानखटाई",
    tagline: "Desi ghee shortbread cookies studded with Iranian pistachio & saffron",
    description: "Melt-in-your-mouth traditional Indian shortbread baked in slow wood ovens with pure A2 Gir Cow Ghee, cardamom powder, and crushed green pistachios.",
    category: "bakery",
    price: 150,
    rating: 4.85,
    reviewCount: 1600,
    prepTime: "Instant",
    spiciness: 0,
    sweetness: 3,
    caffeine: "Zero",
    ingredients: ["Pure Desi Ghee", "Besan", "Cardamom", "Pistachio", "Saffron"],
    pairing: "Shahi Kesar Dum Chai",
    dietary: ["pure-ghee", "chef-special"],
    accentColor: "#34D399",
    iconName: "Cookie"
  },
  {
    id: "kulhad-samosa-chaat",
    name: "Deconstructed Kulhad Samosa Chaat",
    hindiName: "कुल्हड़ समोसा चाट",
    tagline: "Crispy mini samosas layered with Amritsari chole, spiced yogurt & mint chutney",
    description: "Handmade mini flaky crust samosas crushed into a wide clay bowl, topped with 12-hour simmered pindi chole, whipped sweet curd, tamarind-saunth glaze, and sev.",
    category: "street-bites",
    price: 190,
    rating: 4.9,
    reviewCount: 2280,
    badge: "Chef's Delight",
    prepTime: "5 mins",
    spiciness: 3,
    sweetness: 2,
    caffeine: "Zero",
    ingredients: ["Mini Potato Samosas", "Pindi Chole", "Spiced Dahi", "Imli Chutney", "Fresh Coriander"],
    pairing: "Irani Karak Malai Chai",
    dietary: ["chef-special"],
    accentColor: "#F97316",
    iconName: "Utensils"
  },
  {
    id: "paneer-tikka-brioche-slider",
    name: "Charcoal Paneer Tikka Sliders (2 Pcs)",
    hindiName: "तंदूरी पनीर टिक्का स्लाइडर",
    tagline: "Clay oven smoked cottage cheese with pickled onions and mint mayo",
    description: "Soft butter-toasted pav sliders stuffed with clay oven-tandoor smoked malai paneer, seasoned with chaat masala and house roasted garlic dip.",
    category: "street-bites",
    price: 240,
    rating: 4.8,
    reviewCount: 1400,
    prepTime: "8 mins",
    spiciness: 3,
    sweetness: 1,
    caffeine: "Zero",
    ingredients: ["Malai Paneer", "Tandoori Marinade", "Soft Sliders", "Mint Mayo", "Sirka Pyaz"],
    pairing: "Kadak Tulsi Elaichi Chai",
    dietary: ["pure-ghee"],
    accentColor: "#EF4444",
    iconName: "Flame"
  },
  // Artisanal Tins & Hampers
  {
    id: "imperial-tin-assam-orthodox",
    name: "Heritage Tin: Royal CTC & Golden Tips (250g)",
    hindiName: "असम गोल्डन टिप्स टिन",
    tagline: "First-flush single estate orthodox tea in an embossed antique brass canister",
    description: "Directly sourced from the lush banks of the Brahmaputra in Upper Assam. Rich malty body, bold amber liquor, and exceptional natural aroma.",
    category: "artisanal-tins",
    price: 650,
    originalPrice: 799,
    rating: 4.95,
    reviewCount: 880,
    badge: "Artisanal Gift",
    prepTime: "Packed Tin",
    spiciness: 0,
    sweetness: 0,
    caffeine: "High",
    ingredients: ["100% Upper Assam Orthodox & Golden Tip Leaves"],
    pairing: "Brew with fresh buffalo milk & green cardamom",
    dietary: ["vegan", "gluten-free"],
    accentColor: "#F59E0B",
    iconName: "Gift"
  },
  {
    id: "secret-18-spice-potli",
    name: "Secret Adda Chai Masala Potli (150g)",
    hindiName: "गुप्त अड्डा मसाला पोटली",
    tagline: "Hand-pounded traditional blend of 18 sun-dried herbs and spices",
    description: "The identical spice formulation brewed across our Adda outlets. Resealable glass jar packed inside handwoven raw jute potli.",
    category: "artisanal-tins",
    price: 490,
    rating: 4.9,
    reviewCount: 1120,
    badge: "Adda Secret",
    prepTime: "Packed Jar",
    spiciness: 4,
    sweetness: 0,
    caffeine: "Zero",
    ingredients: ["Dry Ginger", "Green Cardamom", "Black Cardamom", "Clove", "Cinnamon", "Star Anise", "Mace", "Nutmeg", "Pippali", "Tulsi Seeds"],
    pairing: "Add 1/4 tsp to any black tea while simmering",
    dietary: ["vegan", "gluten-free", "chef-special"],
    accentColor: "#B45309",
    iconName: "Sparkles"
  }
];

export const ADDA_PILLARS = [
  {
    id: "single-estate",
    number: "01",
    title: "Single-Estate Upper Assam",
    subtitle: "Direct Fair-Trade Harvest",
    description: "We work directly with century-old family tea estates along the Brahmaputra riverbanks. Every leaf is hand-plucked at dawn when moisture and essential oils are at peak concentration.",
    stat: "100%",
    statLabel: "Single Estate Sourced",
    icon: "Sprout"
  },
  {
    id: "silbatta-spices",
    number: "02",
    title: "Stone Silbatta Grinding",
    subtitle: "Preserving Natural Essential Oils",
    description: "Industrial blenders heat up spices and destroy their natural oils. We crush our 18 signature spices on heavy black granite silbatta stones in micro-batches every single morning.",
    stat: "0%",
    statLabel: "Machine Heat Loss",
    icon: "ShieldAlert"
  },
  {
    id: "brass-dum",
    number: "03",
    title: "Brass Handi Slow Dum",
    subtitle: "The Authentic Boiling Ritual",
    description: "Our chai is never microwaved or steam-jetted. We slow-simmer the decoction inside handcrafted brass handis with thick tin lining, unlocking deep caramelization and velvety richness.",
    stat: "25 min",
    statLabel: "Slow Dum Simmer",
    icon: "Flame"
  },
  {
    id: "varanasi-kulhad",
    number: "04",
    title: "Varanasi Kiln Clay Kulhads",
    subtitle: "Eco-Luxe Earth Immersion",
    description: "Crafted by multi-generational potters on the banks of Ganga. Each porous unglazed kulhad infuses raw earthen petrichor notes into every sip before returning gently back to mother earth.",
    stat: "100%",
    statLabel: "Compostable Terracotta",
    icon: "Globe"
  }
];

export const TESTIMONIALS = [
  {
    id: "1",
    author: "Chef Ranveer Brar",
    role: "Masterchef India & Culinary Historian",
    avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80",
    quote: "Chai Ka Adda has revived the lost soul of Indian tea. The Shahi Kesar Dum Chai in that Varanasi kulhad reminds me of early dawn at the ghats. Truly cinematic.",
    rating: 5,
    location: "Mumbai"
  },
  {
    id: "2",
    author: "Devika Shenoy",
    role: "Founder, The Heritage Journal",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote: "The 240-frame cinematic experience is only matched by how incredible the Banarasi Kulhad Masala tastes. It's a sanctuary in the middle of Connaught Place.",
    rating: 5,
    location: "New Delhi"
  },
  {
    id: "3",
    author: "Vikramaditya Roy",
    role: "Tea Sommelier & Author",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote: "Most modern cafes treat chai as an afterthought to espresso. Chai Ka Adda treats the leaf with the reverence of a royal craft. An absolute triumph.",
    rating: 5,
    location: "Bengaluru"
  }
];

export const ADDA_LOCATIONS = [
  {
    id: "delhi-cp",
    city: "New Delhi",
    name: "Connaught Place Heritage Flagship",
    address: "Block B, Radial Road 3, Inner Circle, CP, New Delhi - 110001",
    timings: "6:00 AM – 2:00 AM (Open Daily)",
    phone: "+91 11 4892 0011",
    vibe: "Colonial Arches • Live Brass Handi Counter • Mezzanine Baithak",
    tablesCount: "42 Tables",
    popularOrder: "Banarasi Kulhad + Bun Maska"
  },
  {
    id: "mumbai-bandra",
    city: "Mumbai",
    name: "Bandra Sea Breeze Adda",
    address: "Pali Hill Road, Near Union Park, Bandra West, Mumbai - 400050",
    timings: "6:30 AM – 3:00 AM (Late Night Haven)",
    phone: "+91 22 2640 8822",
    vibe: "Open-Air Clay Courtyard • Irani Bakery Counter • Vinyl Jazz",
    tablesCount: "36 Tables",
    popularOrder: "Irani Karak Malai + Truffle Bun"
  },
  {
    id: "blr-indiranagar",
    city: "Bengaluru",
    name: "Indiranagar 100ft Botanical Adda",
    address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560038",
    timings: "7:00 AM – 1:00 AM",
    phone: "+91 80 4120 7733",
    vibe: "Lush Fern Courtyard • Samovar Counter • Co-working Nooks",
    tablesCount: "50 Tables",
    popularOrder: "Kashmiri Shahi Kahwa + Pista Nankhatai"
  }
];

export const COMPARISON_DATA = [
  {
    feature: "Tea Leaf Selection",
    ordinary: "Dust grade factory sweepings & artificial colors",
    chaiKaAdda: "100% Single-Estate Upper Assam & Darjeeling Whole Leaf",
    highlight: true
  },
  {
    feature: "Spices & Aroma",
    ordinary: "Pre-packaged synthetic masala syrup or chemical essence",
    chaiKaAdda: "18 Stone-crushed traditional whole spices ground every morning",
    highlight: true
  },
  {
    feature: "Brewing Vessel",
    ordinary: "Aluminium pots with rapid high-heat burning",
    chaiKaAdda: "Heavy brass handis with tin lining for slow caramelized dum",
    highlight: true
  },
  {
    feature: "Drinking Experience",
    ordinary: "Bleached paper cups coated with microplastics",
    chaiKaAdda: "Wood-fired unglazed Varanasi terracotta clay kulhads",
    highlight: true
  },
  {
    feature: "Sweetener Quality",
    ordinary: "Refined sulfur-bleached white sugar",
    chaiKaAdda: "Organic raw sugarcane Khandsari, desi Gur, or Forest Honey",
    highlight: true
  }
];
