import { useState } from "react";
import { toast } from "react-toastify";
import useBlogDataContext from "./useBlogDataContext";

const useGetAllBlogs = () => {
  const [loading, setLoading] = useState(null);
  const [error, setErrors] = useState(null);
  const { dispatch } = useBlogDataContext();

  const getAllBlogs = async () => {
    setLoading(true);
    setErrors(null);
    const response = await fetch("http://localhost:5050/posts", {
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
    }

    if (response.ok) {
      setLoading(false);
      json
        .then((res) => {
          dispatch({ type: "SET__BLOGS", payload: res?.blogs });
        })
        .catch((err) => console.log(err));
    }
  };
  return { loading, error, getAllBlogs };
};

export default useGetAllBlogs;
