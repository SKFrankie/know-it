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
  { name: "Coins", path: "/shop/coins"},
  { name: "Money", path: "/shop/money"},
];

const NO_HEADER_ROUTES = ["/login", "/signup"];

const GAMES_SECTIONS = [
  { name: "Grammar Geek", path: "/games/grammar-geek", image: "/images/GrammarGeekMonster.png" },
  { name: "Fab Vocab", path: "/games/fab-vocab", image: "/images/FabVocabMonster.png" },
  { name: "Synonym Roll", path: "/games/synonym-roll", image: "/images/SynonymRollMonster.png" },
  { name: "Antonym Hunt", path: "/games/antonym-hunt", image: "/images/AntonymHuntMonster.png" },
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
  SYNONYM_ROLL: { name: "SYNONYM_ROLL", label: "Synonym Roll", image:"/images/SynonymRollImage.png"},
  FAB_VOCAB: { name: "FAB_VOCAB", label: "Fab Vocab"},
  ANTONYM_HUNT: { name: "ANTONYM_HUNT", label: "Antonym Hunt", image:"/images/AntonymHuntImage.png"},
  GRAMMAR_GEEK: { name: "GRAMMAR_GEEK", label: "Grammar Geek" },
  KNOWLYMPICS: { name: "KNOWLYMPICS" },
};

const POINTS = {
  SMALL: 5,
  BIG: 10,
  HUGE: 20,
};


export { SECTIONS, ADDITIONNAL_SECTIONS, NO_HEADER_ROUTES, GAMES_SECTIONS, REWARD_TYPES, SHOP_SECTIONS, GAME_TYPES, POINTS };
