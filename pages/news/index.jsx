import { useEffect } from "react";
import Loading from "../../components/Loading";
import useBlogDataContext from "../../hooks/BlogData/useBlogDataContext";
import useGetAllNews from "../../hooks/News/useGetAllNews";
import useStyles from "../../utils/useStyles";

const News = () => {
  const { getAllNews, loading, errors } = useGetAllNews();
  const {
    state: { news },
  } = useBlogDataContext();
  useEffect(() => {
    getAllNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { borderBottom } = useStyles();
  // Create error handling on front end

  if (loading) return <Loading />;
  return (
    <div className="news-body">
      {news?.value?.map((data, i) => (
        <div key={i} className="news-card">
          <img
            src={data?.image?.url}
            alt=""
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/news-pages.jpg";
            }}
          />
          <div className="news-text">
            <div className="news-published">
              {data?.datePublished.substring(0, 10)}
            </div>
            <a href={data?.url} className="news-title">
              {data?.title}
            </a>
            <div className="news-description">
              {data?.description?.substring(0, 100) + "..."}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
