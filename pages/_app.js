import Layout from '../components/Layout'
import BgContext, { BgContextProvider } from '../Context/ColourContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import '../styles/login.css'
import '../styles/homePage.css'
import '../styles/blogPost.css'
import AuthContextProvider from '../Context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
    <BgContextProvider>
      <ToastContainer/>
        <Layout>
         <Component {...pageProps} />
        </Layout>
    </BgContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
