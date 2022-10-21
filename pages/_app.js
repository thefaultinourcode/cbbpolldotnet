//import '../styles/globals.css'
import '../styles/style.css'

function MyApp({ Component, pageProps }) {
  console.log('pageProps:', pageProps);
  return <Component {...pageProps} />
}

export default MyApp
