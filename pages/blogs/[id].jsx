import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BlogDataContext } from "../../Context/BlogDataContext";
import useBlogDataContext from "../../hooks/BlogData/useBlogDataContext";
import useGetSingleBlog from "../../hooks/BlogData/useGetSingleBlog";
import Appbutton from "../../reusableComps/Appbutton";
import RenderIf from "../../reusableComps/RenderIf";

const BlogPost = ({ loggedIn = true, isOwnPost = true }) => {
  const router = useRouter();
  const { id } = router.query;
  const { getSingleBlog, loading, error } = useGetSingleBlog();
  const getSingleBlogA = async () => await getSingleBlog(id);

  const { state } = useBlogDataContext(BlogDataContext);

  useEffect(() => {
    if (id) getSingleBlogA(id);

    if (Object?.entries(state?.singleBlog) === 0) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const {
    _id,
    message,
    image,
    userId,
    userName,
    likes,
    comments,
    datePosted,
    title,
  } = state?.singleBlog;
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const handleOpenEditModal = () => setOpen(true);
  const handleCloseEditModal = () => setOpen(false);

  const handleOpenDeleteModal = () => setOpen(true);
  const handleCloseDeleteModal = () => setOpen(false);

  const handleEditBlog = () => {};
  const handleDeleteBlog = () => {};
  return (
    // Find a way to navigate back home. goBack button at top? Finish Create A blog page {type of form}. Then think about personal blogs display ! Own Profile.

    <div className="singleBlogPost">
      <h2>{title}</h2>
      <div className="blogImage">
        <img className="blog-img" src={image} />
      </div>
      {/* STRING SPLIT TO DETECT LINE BREAK let separateLines = str.split(/\r?\n|\r|\n/g); */}
      <p className={`blogText`}>{message}</p>
      <RenderIf isTrue={loggedIn && isOwnPost}>
        <div className="actionButtons">
          <Appbutton
            title="Edit"
            className={"appButton"}
            onClick={() => handleEditBlog(_id)}
          />
          <Appbutton
            title="Delete"
            className={"appButton"}
            onClick={() => handleDeleteBlog(_id)}
          />
        </div>
      </RenderIf>
    </div>
  );
};

export default BlogPost;
