import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuthContext from "../Auth/useAuthContext";
import useBlogDataContext from "./useBlogDataContext";

const useDeleteBlog = () => {
  const { user } = useAuthContext();

  const { dispatch } = useBlogDataContext();
  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState(null);
  const router = useRouter();

  const deleteBlog = async (id) => {
    if (!user) return;

    const response = await fetch(`http://localhost:5050/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setErrors(json?.message);
      toast.error(json?.message);
    }
    if (response.ok) {
      setLoading(false);
      dispatch({ type: "DELETE__BLOG", payload: { id } });
      toast.success("Blog has been deleted !");
      router.push("/");
    }
  };
  return { deleteBlog, loading, errors };
};

export default useDeleteBlog;
