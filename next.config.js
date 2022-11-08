const withPWA = require('next-pwa')({
  dest: 'public'
})
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  // pwa: {
  //   dest: "public",
  //   register: true,
  //   skipWaiting: true,
  //   disable: (process.env.NODE_ENV === "development"),
  // },
  pwa: {
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/]
  },
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  devtool: (process.env.NODE_ENV === "development") ? "cheap-module-eval-source-map" : null,
});