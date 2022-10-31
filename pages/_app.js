import Layout from "../components/Layout";
import ContextProviders from "../components/ContextProviders/ContextProviders";
import { ToastContainer } from "react-toastify";
import RenderMounted from "../reusableComps/RenderMounted";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "../styles/globals.css";
import "../styles/login.css";
import "../styles/homePage.css";
import "../styles/blogPost.css";
import "../styles/createBlog.css";
import "../styles/modals.css";
import "../styles/news.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RenderMounted>
        <ToastContainer />
      </RenderMounted>
      <ContextProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProviders>
    </>
  );
}

export default MyApp;
