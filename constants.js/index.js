const SECTIONS = [
  { name: "Home", path: "/", icon: "fluent:home-16-filled" },
  { name: "Shop", path: "/shop", icon: "entypo:shop" },
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

const NO_HEADER_ROUTES = ["/login", "/signup"];

const GAMES_SECTIONS = [
  { name: "Grammar Geek", path: "/grammar-geek", image: "/images/GrammarGeekMonster.png" },
  {name: "Fab Vocab", path: "/fab-vocab", image: "/images/FabVocabMonster.png"},
  {name: "Synonym Roll", path: "/synonym-roll", image: "/images/SynonymRollMonster.png"},
  {name: "Antonym Hunt", path: "/antonym-hunt", image: "/images/AntonymHuntMonster.png"},
]

const REWARD_TYPES = {
  "COINS": {image: "/images/coin.png", name: "Coins"},
  "STARS": {image: "/images/stars.png", name: "Stars"},
  "STAR_PERCENTAGE": {image: "/images/star_percentage.png", name: "Star Percentage"},
}

export { SECTIONS, ADDITIONNAL_SECTIONS, NO_HEADER_ROUTES, GAMES_SECTIONS, REWARD_TYPES };
