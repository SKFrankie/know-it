module.exports = {
  reactStrictMode: true,
   async redirects() {
    return [
      {
        source: '/',
        destination: '/coming-soon',
        permanent: true,
      },
    ]
  },
}
