const FileUpload = ({
  name,
  id,
  handleChange,
  icon,
  labelClasses,
  iconClasses,
  title,
  style,
}) => {
  return (
    <div className="file-upload-body">
      {/* <p className="paraLabel">{title}</p> */}
      <label
        htmlFor={id}
        className={`file-upload ${labelClasses}`}
        style={{
          ...style,
        }}>
        <div className={`file-icon ${iconClasses}`}>
          <span>{icon}</span>
          <span>Upload Image</span>
        </div>
        <input
          type="file"
          name={name}
          id={id}
          onChange={handleChange}
          accept="image"
        />
      </label>
    </div>
  );
};

export default FileUpload;
