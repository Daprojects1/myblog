import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { BlogDataContext } from "../../Context/BlogDataContext";
import useBlogDataContext from "./useBlogDataContext";

const useGetSingleBlog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(null);
  const [error, setErrors] = useState(null);
  const { dispatch } = useBlogDataContext(BlogDataContext);

  const getSingleBlog = async (id) => {
    setLoading(true);
    setErrors(null);

    try {
      const response = await fetch(`http://localhost:5050/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setErrors(json?.message);
        toast.error(json?.message);
        router.replace("/");
        dispatch({ type: "GET__BLOG", payload: {} });
      }

      if (response.ok) {
        setLoading(false);
        try {
          dispatch({ type: "SET__BLOG", payload: json?.blog });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      const err = error.message || error;
      console.log(error);
      toast.error(err);
    }
  };
  return { loading, error, getSingleBlog };
};

export default useGetSingleBlog;
