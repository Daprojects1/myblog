import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import apiEndPoints from "../../constants/apiEndpoints";

const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { dispatch } = useAuthContext();

  const signIn = async (username, password) => {
    setLoading(true);
    setErrors(null);

    try {
      const response = await fetch(apiEndPoints?.login, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setErrors(json?.message);
        toast.error(json?.message);
      }
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json?.user));
        dispatch({ type: "LOGIN", payload: json?.user });
        toast.success("success !");
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      const err = error.message || error;
      console.log(error);
      toast.error(err);
    }
  };

  return { signIn, loading, errors };
};

export default useLogin;
