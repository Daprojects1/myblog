import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import apiEndPoints from "../../constants/apiEndpoints";
import useAuthContext from "../Auth/useAuthContext";
import useBlogDataContext from "./useBlogDataContext";
import useGetSingleBlog from "./useGetSingleBlog";

const useEditBlog = () => {
  const { user } = useAuthContext();

  const router = useRouter();
  const { dispatch } = useBlogDataContext();

  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState(null);
  const { getSingleBlog } = useGetSingleBlog();

  const editBlog = async (id, data) => {
    setLoading(true);

    if (!user) {
      toast.error("user is not logged in!");
      return;
    }

    try {
      const response = await fetch(`${apiEndPoints?.posts}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: data,
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setErrors(json?.msg || json?.message);
        toast.error(json?.msg || json?.message);
      }

      if (response.ok) {
        console.log(json);
        setLoading(false);
        toast.success("Success !");
        getSingleBlog(id);
        router.push(`/blogs/${id}`);
      }
    } catch (error) {
      const err = error.message || error;
      console.log(error);
      toast.error(err);
    }
  };

  return { editBlog, loading, errors };
};

export default useEditBlog;
