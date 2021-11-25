import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    primary: "red",
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp