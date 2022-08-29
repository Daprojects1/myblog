import { useState } from "react";
import { toast } from "react-toastify";
import { BlogDataContext } from "../../Context/BlogDataContext";
import useBlogDataContext from "./useBlogDataContext";

const useGetSingleBlog = () => {
  const [loading, setLoading] = useState(null);
  const [error, setErrors] = useState(null);
  const { dispatch } = useBlogDataContext(BlogDataContext);

  const getSingleBlog = async (id) => {
    setLoading(true);
    setErrors(null);
    const response = await fetch(`http://localhost:5050/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = response.json();

    if (!response.ok) {
      setLoading(false);
      setErrors(json?.message);
      toast.error(json?.message);
      dispatch({ type: "GET__BLOG", payload: {} });
    }

    if (response.ok) {
      setLoading(false);
      json
        .then((res) => {
          dispatch({ type: "GET__BLOG", payload: res?.blog });
        })
        .catch((err) => console.log(err));
    }
  };
  return { loading, error, getSingleBlog };
};

export default useGetSingleBlog;
