import Layout from '../components/Layout'
import BgContext, { BgContextProvider } from '../Context/ColourContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import '../styles/login.css'
import '../styles/homePage.css'
import '../styles/blogPost.css'
import AuthContextProvider from '../Context/AuthContext';
import BlogDataContextProvider from '../Context/BlogDataContext';

function MyApp({ Component, pageProps }) {
  return (
    <BlogDataContextProvider>
    <AuthContextProvider>
    <BgContextProvider>
      <ToastContainer/>
        <Layout>
         <Component {...pageProps} />
        </Layout>
    </BgContextProvider>
    </AuthContextProvider>
    </BlogDataContextProvider>
  )
}

export default MyApp
