import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuthContext from "../Auth/useAuthContext";

const useCreateBlog = () => {
  const router = useRouter();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(null);
  const { user } = useAuthContext();

  const createBlog = async (data) => {
    setLoading(true);
    setErrors(null);
    if (!user) return;

    const { title, message, image } = data;

    console.log(data);
    try {
      const response = await fetch("http://localhost:5050/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: data,
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setErrors(json?.message);
        toast.error(json?.message);
      }

      if (response.ok) {
        setLoading(true);
        toast.success("Success !");
        console.log(json);
        router.push("/");
      }
    } catch (error) {
      const err = error.message || error;
      console.log(error);
      toast.error(err);
    }
  };
  return { createBlog, loading, errors };
};

export default useCreateBlog;
