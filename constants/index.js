const SECTIONS = [
  { name: "Home", path: "/", icon: "fluent:home-16-filled" },
  {
    name: "Shop",
    path: "/shop/coins",
    active: ["/shop/coins", "/shop/money"],
    icon: "entypo:shop",
  },
  {
    name: "Gigil Collection",
    path: "/collection",
    restricted: true,
    icon: "noto-v1:alien-monster",
  },
  { name: "About", path: "/about/about-us", webOnly: true },
  { name: "Settings", path: "/settings", icon: "ci:settings-filled" },
];
const ADDITIONNAL_SECTIONS = [
  { name: "Profile", path: "/profile", restricted: true, icon: "fluent:person-16-filled" },
];

const SHOP_SECTIONS = [
  { name: "Buy Gigils", path: "/shop/coins" },
  { name: "In-App Purchases", path: "/shop/money" },
];

const ABOUT_SECTIONS = [
  { name: "Privacy Policy", path: "/about/privacy-policy" },
  { name: "Terms of Service", path: "/about/terms-of-service" },
  { name: "Credits", path: "/about/credits" },
  { name: "About Us", path: "/about/about-us" },
];

const NO_HEADER_ROUTES = ["/login", "/signup"];

const GAMES_SECTIONS = [
  {
    name: "Grammar Geek",
    path: "/games/grammar-geek",
    image: "/images/GrammarGeekImage.png",
    align: "end",
  },
  {
    name: "Synonym Roll",
    path: "/games/synonym-roll",
    image: "/images/SynonymRollImage.png",
    align: "center",
  },
  {
    name: "Antonym Hunt",
    path: "/games/antonym-hunt",
    image: "/images/AntonymHuntImage.png",
    align: "start",
  },
  {
    name: "Fab Vocab",
    path: "/games/fab-vocab",
    image: "/images/FabVocabImage.png",
    align: "end",
  },
];

const REWARD_TYPES = {
  COINS: { image: "/images/coin.png", name: "Coins", label: "coins" },
  STARS: { image: "/images/star.png", name: "Stars", label: "stars" },
  STAR_PERCENTAGE: {
    image: "/images/star_percentage.png",
    name: "Star Percentage",
    label: "starPercentage",
  },
};

const GAME_TYPES = {
  SYNONYM_ROLL: {
    name: "SYNONYM_ROLL",
    label: "Synonym Roll",
    image: "/images/SynonymRollImage.png",
    right: "/images/SynonymRollImageRight.png",
    id: "synonymRoll",
  },
  FAB_VOCAB: {
    name: "FAB_VOCAB",
    label: "Fab Vocab",
    image: "/images/FabVocabImage.png",
    right: "/images/FabVocabImageRight.png",
    id: "fabVocab",
  },
  ANTONYM_HUNT: {
    name: "ANTONYM_HUNT",
    label: "Antonym Hunt",
    image: "/images/AntonymHuntImage.png",
    right: "/images/AntonymHuntImageRight.png",
    id: "antonymHunt",
  },
  GRAMMAR_GEEK: {
    name: "GRAMMAR_GEEK",
    label: "Grammar Geek",
    image: "/images/GrammarGeekImage.png",
    right: "/images/GrammarGeekImageRight.png",
    id: "grammarGeek",
  },
  KNOWLYMPICS: { name: "KNOWLYMPICS", label: "Knowlympics", id: "knowlympics" },
};

const POINTS = {
  SMALL: 1,
  MEDIUM: 2,
  BIG: 10,
  HUGE: 20,
};

const PURCHASE_TYPES = {
  HOURS_12_PREMIUM: "HOURS_12_PREMIUM",
  MONTH_1_PREMIUM: "MONTH_1_PREMIUM",
  YEAR_1_PREMIUM: "YEAR_1_PREMIUM",

  STARS_5: "STARS_5",
  STARS_10: "STARS_10",
  STARS_15: "STARS_15",

  COINS_250: "COINS_250",
  COINS_500: "COINS_500",
  COINS_750: "COINS_750",
  COINS_1000: "COINS_1000",

  RECOVER_DOUBLE_GIFTS: "RECOVER_DOUBLE_GIFTS",
};

const getPremiumDescription = (time, bonusCoins) => {
  return `Get 10% more coins and enjoy playing without any ads for ${time}. You also get ${bonusCoins} coins as a gift.`;
};

const getStarsDescription = (stars) => {
  return `Get ${stars} stars`;
};

const getCoinsDescription = (coins) => {
  return `Get ${coins} coins`;
};

const PURCHASES = {
  // premium
  [PURCHASE_TYPES.HOURS_12_PREMIUM]: {
    label: PURCHASE_TYPES.HOURS_12_PREMIUM,
    name: "12 Hour Bundle",
    description: getPremiumDescription("12 hours", "50"),
    price: "0.50",
    quantity: 12,
    type: "hours",
    bonusCoins: 50,
    premium: true,
  },
  [PURCHASE_TYPES.MONTH_1_PREMIUM]: {
    label: PURCHASE_TYPES.MONTH_1_PREMIUM,
    name: "1 Month Bundle",
    description: getPremiumDescription("1 month", "350"),
    price: "1.99",
    quantity: 1,
    type: "months",
    bonusCoins: 350,
    premium: true,
  },
  [PURCHASE_TYPES.YEAR_1_PREMIUM]: {
    label: PURCHASE_TYPES.YEAR_1_PREMIUM,
    name: "1 Year Bundle",
    description: getPremiumDescription("1 year", "1000"),
    price: "6.99",
    quantity: 1,
    type: "years",
    bonusCoins: 1000,
    premium: true,
  },

  // stars
  [PURCHASE_TYPES.STARS_5]: {
    label: PURCHASE_TYPES.STARS_5,
    name: "5 Stars",
    description: getStarsDescription(5),
    price: "0.50",
    quantity: 5,
    type: "stars",
  },
  [PURCHASE_TYPES.STARS_10]: {
    label: PURCHASE_TYPES.STARS_10,
    name: "10 Stars",
    description: getStarsDescription(10),
    price: "0.80",
    quantity: 10,
    type: "stars",
  },
  [PURCHASE_TYPES.STARS_15]: {
    label: PURCHASE_TYPES.STARS_15,
    name: "15 Stars",
    description: getStarsDescription(15),
    price: "1.10",
    quantity: 15,
    type: "stars",
  },

  // coins

  [PURCHASE_TYPES.COINS_250]: {
    label: PURCHASE_TYPES.COINS_250,
    name: "250 Coins",
    description: getCoinsDescription(250),
    price: "0.50",
    quantity: 250,
    type: "coins",
  },
  [PURCHASE_TYPES.COINS_500]: {
    label: PURCHASE_TYPES.COINS_500,
    name: "500 Coins",
    description: getCoinsDescription(500),
    price: "0.80",
    quantity: 500,
    type: "coins",
  },
  [PURCHASE_TYPES.COINS_750]: {
    label: PURCHASE_TYPES.COINS_750,
    name: "750 Coins",
    description: getCoinsDescription(750),
    price: "1.10",
    quantity: 750,
    type: "coins",
  },
  [PURCHASE_TYPES.COINS_1000]: {
    label: PURCHASE_TYPES.COINS_1000,
    name: "1000 Coins",
    description: getCoinsDescription(1000),
    price: "1.50",
    quantity: 1000,
    type: "coins",
  },

  // double gifts
  [PURCHASE_TYPES.RECOVER_DOUBLE_GIFTS]: {
    label: PURCHASE_TYPES.RECOVER_DOUBLE_GIFTS,
    name: "Recover lost gifts and double your gifts",
    description: "Recover all lost gifts and double gifts you already got",
    price: "3.99",
  },
};

export {
  SECTIONS,
  ADDITIONNAL_SECTIONS,
  NO_HEADER_ROUTES,
  GAMES_SECTIONS,
  REWARD_TYPES,
  SHOP_SECTIONS,
  ABOUT_SECTIONS,
  GAME_TYPES,
  POINTS,
  PURCHASE_TYPES,
  PURCHASES,
};
