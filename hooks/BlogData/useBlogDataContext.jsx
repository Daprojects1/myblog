import { useContext } from "react";
import { BlogDataContext } from "../../Context/BlogDataContext";

const useBlogDataContext = () => {
  const blogDataCtx = useContext(BlogDataContext);

  if (!blogDataCtx) {
    throw Error("useAuthContext must be used within AuthContextProvider");
  }
  return blogDataCtx;
};

export default useBlogDataContext;
