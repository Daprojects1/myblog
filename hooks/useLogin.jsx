import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { dispatch } = useAuthContext();

  const signIn = async (username, password) => {
    setLoading(true);
    setErrors(null);

    const response = await fetch("http://localhost:5050/login", {
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
  };

  return { signIn, loading, errors };
};

export default useLogin;
