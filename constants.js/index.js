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

export { SECTIONS, ADDITIONNAL_SECTIONS };
