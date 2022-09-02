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

    try {
      const response = await fetch("http://localhost:5050/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      const json = response.json();

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
      console.log(error);
      toast.error(error.message);
    }
  };
  return { createBlog, loading, errors };
};

export default useCreateBlog;
