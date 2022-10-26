import { useState } from "react";
import apiEndPoints from "../../constants/apiEndpoints";
import { toast } from "react-toastify";

const useHandleLike = () => {
  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleLike = async (id) => {
    setLoading(true);
    setErrors(null);

    try {
      const response = await fetch(`${apiEndPoints?.posts}/${id}`, {
        method: "POST",
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
      }

      if (response.ok) {
        setLoading(false);
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
