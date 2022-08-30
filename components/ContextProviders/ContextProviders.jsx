import AuthContextProvider from "../../Context/AuthContext";
import BlogDataContextProvider from "../../Context/BlogDataContext";
import { BgContextProvider } from "../../Context/ColourContext";

const ContextProviders = ({ children }) => {
  return (
    <AuthContextProvider>
      <BlogDataContextProvider>
        <BgContextProvider>{children}</BgContextProvider>
      </BlogDataContextProvider>
    </AuthContextProvider>
  );
};

export default ContextProviders;
