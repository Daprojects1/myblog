import Layout from '../components/Layout'
import BgContext, { BgContextProvider } from '../Context/ColourContext'
import '../styles/globals.css'
import '../styles/login.css'
import '../styles/homePage.css'

function MyApp({ Component, pageProps }) {
  return (
    <BgContextProvider>
        <Layout>
         <Component {...pageProps} />
        </Layout>
    </BgContextProvider>
  )
}

export default MyApp
