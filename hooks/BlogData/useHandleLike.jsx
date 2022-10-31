import { useState } from "react";
import apiEndPoints from "../../constants/apiEndpoints";
import { toast } from "react-toastify";
import useAuthContext from "../Auth/useAuthContext";
import useBlogDataContext from "./useBlogDataContext";
import { useRouter } from "next/router";

const useHandleLike = () => {
  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useBlogDataContext();
  const router = useRouter();

  const handleLike = async (id, liked) => {
    setLoading(true);
    setErrors(null);

    try {
      const response = await fetch(`${apiEndPoints?.likes}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken || user?.token}`,
        },
        body: JSON.stringify({
          liked,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setErrors(json?.message);
        toast.error(json?.message);
        router.replace("/");
      }

      if (response.ok) {
        setLoading(false);
        dispatch({ type: "SET__BLOG", payload: json?.blog });
      }
    } catch (error) {
      const err = error.message || error;
      console.log(error);
      toast.error(err);
    }
  };

  return { handleLike, loading, errors };
};

export default useHandleLike;
