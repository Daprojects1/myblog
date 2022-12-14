import useAuthContext from "../hooks/Auth/useAuthContext";
import useStyles from "../utils/useStyles";
import { Interweave } from "interweave";
import ProfileIcon from "../components/Svgs/ProfileIcon";

const PreviewCard = ({
  title,
  previewText,
  handleRead,
  date,
  author,
  id,
  userId,
}) => {
  const { user } = useAuthContext();
  const { borderBottom, currentColor } = useStyles();
  const isUser = user?._id === userId;

  const mainDate = date?.split(" ")[0];
  return (
    <div className="previewCard" style={{ borderBottom: borderBottom }}>
      <div className="preview__imgDate">
        {/* ADD USER IMAGE */}
        <ProfileIcon />
        <p
          className="preview__author"
          style={{ color: isUser ? "mediumpurple" : "" }}>
          {author}
        </p>
        <p className="preview__date">{mainDate}</p>
      </div>
      <div className="title__prev">
        <h3 className="preview__title">{title}</h3>
        <p className="preview__prev">{`${previewText.substring(0, 80)}...`}</p>
      </div>
      <p className="preview__more" onClick={() => handleRead(id)}>
        Read
      </p>
    </div>
  );
};

export default PreviewCard;
