import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BlogDataContext } from "../../Context/BlogDataContext";
import useBlogDataContext from "../../hooks/BlogData/useBlogDataContext";
import useGetSingleBlog from "../../hooks/BlogData/useGetSingleBlog";
import useAuthContext from "../../hooks/Auth/useAuthContext";
import Appbutton from "../../reusableComps/Appbutton";
import RenderIf from "../../reusableComps/RenderIf";
import DeleteBlogModal from "../../components/Modals/DeleteBlogModal";
import EditBlogModal from "../../components/Modals/EditBlogModal";
import useStyles from "../../utils/useStyles";
import useDeleteBlog from "../../hooks/BlogData/useDeleteBlog";
import { Interweave } from "interweave";
import ProfileIcon from "../../components/Svgs/ProfileIcon";
import placeholderImages from "../../constants/images";
import apiEndPoints from "../../constants/apiEndpoints";
import Loading from "../../components/Loading";
import { AiFillLike } from "react-icons/ai";
import { toast } from "react-toastify";
import useHandleLike from "../../hooks/BlogData/useHandleLike";
import withAuthCheck from "../../components/HighOrderComponents/withAuthCheck";

const BlogPost = ({ loggedIn = true, isOwnPost = true }) => {
  const router = useRouter();
  const { id } = router.query;
  const { getSingleBlog, loading, error } = useGetSingleBlog();
  const { state, dispatch } = useBlogDataContext(BlogDataContext);
  const { user } = useAuthContext();
  const { deleteBlog, loading: deleteLoading, errors } = useDeleteBlog();
  const {
    handleLike,
    loading: handleLikeLoading,
    errors: handleLikeErrors,
  } = useHandleLike();

  const getSingleBlogA = async () => await getSingleBlog(id);
  useEffect(() => {
    //  not authorized, reroute home
    if (id) getSingleBlogA();

    return () => {
      dispatch({ type: "SET__BLOG", payload: {} });
    };
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
    totalLikes,
    datePosted,
    title,
  } = state?.singleBlog;

  const imgUrl = image
    ? `${apiEndPoints.server}${image}`
    : placeholderImages[1];

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const hasLiked = likes?.find((like) => like?.userId === user?._id);
    if (!hasLiked) {
      setIsLiked(false);
      return;
    }

    setIsLiked(true);
  }, [likes, user]);

  const { currentColor, borderBottom } = useStyles();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const handleOpenEditModal = () => setIsOpenEditModal(true);
  const handleCloseEditModal = () => setIsOpenEditModal(false);

  const handleOpenDeleteModal = () => setIsOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

  const handleEditBlog = () => {
    handleOpenEditModal();
  };
  const handleDeleteBlog = () => {
    handleOpenDeleteModal();
  };

  const handleChangeLikes = () => {
    if (!user) {
      toast.info("Sorry, you have to be logged in to like a post");
      return router.push("/login");
    }

    // console.log(currentLike);
    const currentLike = isLiked;
    setIsLiked((prev) => !prev);
    handleLike(_id, !currentLike);
    // make a call to backend with current data. also change current likes count
  };

  const datePostedN = datePosted?.split(" ")[0];

  const isUser = user && user?._id === userId;

  if (loading) return <Loading />;
  return (
    // Find a way to navigate back home. goBack button at top? Finish Create A blog page {type of form}. Then think about personal blogs display ! Own Profile.

    <div className="singleBlogPost">
      <div className="blogImage">
        <img
          className="blog-img"
          src={imgUrl}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = `${placeholderImages[1]}`;
          }}
        />
      </div>

      <div className="image__author">
        <ProfileIcon />
        <div className="username__date">
          <p>
            By{" "}
            <span style={{ color: isUser ? "mediumpurple" : "" }}>
              {userName}
            </span>
          </p>
          <p>{datePostedN}</p>
        </div>
        {isUser && <span className="likes">{totalLikes + " Likes"}</span>}
      </div>
      <h2>{title}</h2>
      <p className={`blogText`}>
        <Interweave content={message} />
      </p>
      <RenderIf isTrue={user?._id !== userId}>
        <div className="likes-section">
          <div
            className={`like-btn ${isLiked && "liked"}`}
            style={{ border: !isLiked ? borderBottom : "" }}
            onClick={handleChangeLikes}>
            <AiFillLike />
          </div>
          <div>{totalLikes + " likes"}</div>
        </div>
      </RenderIf>
      <RenderIf isTrue={isUser}>
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

      {/* MODALS */}
      {
        <EditBlogModal
          isOpen={isOpenEditModal}
          handleClose={handleCloseEditModal}
          data={state?.singleBlog}
        />
      }
      <DeleteBlogModal
        isOpen={isOpenDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={() => deleteBlog(_id)}
      />
    </div>
  );
};

export default withAuthCheck(BlogPost);
