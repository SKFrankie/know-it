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
    icon: "emojione-monotone:alien-monster",
  },
  { name: "About", path: "/about", webOnly: true },
];
const ADDITIONNAL_SECTIONS = [
  { name: "Profile", path: "/profile", restricted: true, icon: "fluent:person-16-filled" },
  { name: "Settings", path: "/settings", icon: "ci:settings-filled" },
];

const SHOP_SECTIONS = [
  { name: "Coins", path: "/shop/coins" },
  { name: "Money", path: "/shop/money" },
];

const NO_HEADER_ROUTES = ["/login", "/signup"];

const GAMES_SECTIONS = [
  {
    name: "Grammar Geek",
    path: "/games/grammar-geek",
    image: "/images/GrammarGeekMonster.png",
    align: "end",
  },
  {
    name: "Synonym Roll",
    path: "/games/synonym-roll",
    image: "/images/SynonymRollMonster.png",
    align: "center",
  },
  {
    name: "Antonym Hunt",
    path: "/games/antonym-hunt",
    image: "/images/AntonymHuntMonster.png",
    align: "start",
  },
  {
    name: "Fab Vocab",
    path: "/games/fab-vocab",
    image: "/images/FabVocabMonster.png",
    align: "end",
  },
];

const REWARD_TYPES = {
  COINS: { image: "/images/coin.png", name: "Coins", label: "coins" },
  STARS: { image: "/images/stars.png", name: "Stars", label: "stars" },
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
  },
  FAB_VOCAB: { name: "FAB_VOCAB", label: "Fab Vocab" },
  ANTONYM_HUNT: {
    name: "ANTONYM_HUNT",
    label: "Antonym Hunt",
    image: "/images/AntonymHuntImage.png",
  },
  GRAMMAR_GEEK: { name: "GRAMMAR_GEEK", label: "Grammar Geek" },
  KNOWLYMPICS: { name: "KNOWLYMPICS", label: "Knowlympics" },
};

const POINTS = {
  SMALL: 5,
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
    name: "Premium : 12 Hours package",
    description: getPremiumDescription("12 hours", "50"),
    price: "0.50",
  },
  [PURCHASE_TYPES.MONTH_1_PREMIUM]: {
    label: PURCHASE_TYPES.MONTH_1_PREMIUM,
    name: "Premium : 1 Month package",
    description: getPremiumDescription("1 month", "350"),
    price: "1.99",
  },
  [PURCHASE_TYPES.YEAR_1_PREMIUM]: {
    label: PURCHASE_TYPES.YEAR_1_PREMIUM,
    name: "Premium : 1 Year package",
    description: getPremiumDescription("1 year", "1000"),
    price: "6.99",
  },

  // stars
  [PURCHASE_TYPES.STARS_5]: {
    label: PURCHASE_TYPES.STARS_5,
    name: "5 Stars",
    description: getStarsDescription(5),
    price: "0.50",
    quantity: 5,
    type: "stars"
  },
  [PURCHASE_TYPES.STARS_10]: {
    label: PURCHASE_TYPES.STARS_10,
    name: "10 Stars",
    description: getStarsDescription(10),
    price: "0.80",
    quantity: 10,
    type: "stars"
  },
  [PURCHASE_TYPES.STARS_15]: {
    label: PURCHASE_TYPES.STARS_15,
    name: "15 Stars",
    description: getStarsDescription(15),
    price: "1.10",
    quantity: 15,
    type: "stars"
  },

  // coins

  [PURCHASE_TYPES.COINS_250]: {
    label: PURCHASE_TYPES.COINS_250,
    name: "250 Coins",
    description: getCoinsDescription(250),
    price: "0.50",
    quantity: 250,
    type: "coins"
  },
  [PURCHASE_TYPES.COINS_500]: {
    label: PURCHASE_TYPES.COINS_500,
    name: "500 Coins",
    description: getCoinsDescription(500),
    price: "0.80",
    quantity: 500,
    type: "coins"
  },
  [PURCHASE_TYPES.COINS_750]: {
    label: PURCHASE_TYPES.COINS_750,
    name: "750 Coins",
    description: getCoinsDescription(750),
    price: "1.10",
    quantity: 750,
    type: "coins"
  },
  [PURCHASE_TYPES.COINS_1000]: {
    label: PURCHASE_TYPES.COINS_1000,
    name: "1000 Coins",
    description: getCoinsDescription(1000),
    price: "1.50",
    quantity: 1000,
    type: "coins"
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
  GAME_TYPES,
  POINTS,
  PURCHASE_TYPES,
  PURCHASES,
};
