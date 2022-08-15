import useStyles from "../utils/useStyles";

const PreviewCard = ({ title, previewText, handleRead, date, author, id }) => {
  const { borderBottom, currentColor } = useStyles();
  return (
    <div className="previewCard" style={{ borderBottom: borderBottom }}>
      <div className="preview__imgDate">
        {/* ADD USER IMAGE */}
        <div
          className="fake__img"
          style={{ border: `1px solid ${currentColor}` }}></div>
        <p className="preview__author">{author || "DaBlogs"}</p>
        <p className="preview__date">{date}</p>
      </div>
      <div className="title__prev">
        <h3 className="preview__title">{title}</h3>
        <p className="preview__prev">{previewText}</p>
      </div>
      <p className="preview__more" onClick={() => handleRead(id)}>
        Read
      </p>
    </div>
  );
};

export default PreviewCard;
