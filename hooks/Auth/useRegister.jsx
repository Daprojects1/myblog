import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuthContext from "./useAuthContext";
import apiEndPoints from "../../constants/apiEndpoints";

const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (registerData) => {
    const { username, password, email } = registerData;
    setLoading(true);
    setErrors(null);

    try {
      const response = await fetch(apiEndPoints?.register, {
        method: "POST",
        body: JSON.stringify({ username, password, email }),
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
        const { user } = json;
        localStorage.setItem("user", JSON.stringify(user));
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

  return { register, loading, errors };
};

export default useRegister;
