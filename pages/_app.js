import Container from '../components/Container'
import BgContext, { BgContextProvider } from '../Context/ColourContext'
import '../styles/globals.css'
import '../styles/login.css'

function MyApp({ Component, pageProps }) {
  return (
    <BgContextProvider>
        <Container >
         <Component {...pageProps} />
        </Container>
    </BgContextProvider>
  )
}

export default MyApp
