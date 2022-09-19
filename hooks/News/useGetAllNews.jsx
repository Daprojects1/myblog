import { useState } from "react";
import axios from "axios";
import useBlogDataContext from "../BlogData/useBlogDataContext";
import { toast } from "react-toastify";

const useGetAllNews = () => {
  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState(null);
  const { dispatch } = useBlogDataContext();
  const getAllNews = () => {
    setLoading(true);
    setErrors(null);

    const options = {
      method: "GET",
      url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
      params: {
        q: "world news",
        pageNumber: "1",
        pageSize: "20",
        autoCorrect: "true",
        fromPublishedDate: "null",
        toPublishedDate: "null",
      },
      // 43b2e0a6c7msh78abb2e9c5b558ep169e91jsnca4dd6bf453b
      // 6837a1f539msh1b705e970023170p151f68jsn293d56b07c2c
      headers: {
        "X-RapidAPI-Key": "43b2e0a6c7msh78abb2e9c5b558ep169e91jsnca4dd6bf453b",
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setLoading(false);
        dispatch({ type: "SET__NEWS", payload: response.data });
      })
      .catch(function (error) {
        setLoading(false);
        setErrors(error);
        console.log(error);
        toast.error(error?.response?.data?.message);
      });
  };

  return { getAllNews, loading, errors };
};

export default useGetAllNews;
