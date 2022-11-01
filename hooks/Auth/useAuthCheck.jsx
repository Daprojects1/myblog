import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuthContext from "./useAuthContext";
import apiEndPoints from "../../constants/apiEndpoints";

const useAuthCheck = () => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(null);

  const { dispatch } = useAuthContext();
  const router = useRouter();

  const authCheck = async (user) => {
    if (!user) {
      // dispatch({ type: "LOGOUT" });
      return;
    }

    setLoading(true);
    setErrors(null);
    try {
      const response = await fetch(apiEndPoints.authCheck, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        toast.error("Please login again, token has expired");
        dispatch({ type: "LOGOUT" });
        router.push("/login");
      }

      if (response.ok) {
        setLoading(false);
        dispatch({ type: "LOGIN", payload: user });
        // router.push("/");
      }
    } catch (error) {
      const err = error.message || error;
      console.log(error);
      toast.error(err);
    }
  };
  return { authCheck, loading, errors };
};

export default useAuthCheck;
