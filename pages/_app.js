import Layout from '../components/Layout'
import ContextProviders from '../components/ContextProviders/ContextProviders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import '../styles/globals.css'
import '../styles/login.css'
import '../styles/homePage.css'
import '../styles/blogPost.css'
import '../styles/modals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ContextProviders>
      <ToastContainer/>
        <Layout>
         <Component {...pageProps} />
        </Layout>
    </ContextProviders>
  )
}

export default MyApp
