import RenderMounted from "../../reusableComps/RenderMounted";
import Input from "../../reusableComps/Input";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import useStyles from "../../utils/useStyles";
import FileUpload from "../../reusableComps/FileUpload";
import Upload from "../Svgs/Upload";
import AppButton from "../../reusableComps/Appbutton";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const CreateBlogBody = ({
  formik,
  handleChangeMessage,
  messageValue,
  messageError,
  handleCancelImage,
  handleButtonSubmit,
  handlePhotoUpload,
  imgUrl,
  edit,
}) => {
  const { checked, currentColor } = useStyles();
  const styleTxt = checked ? "react-quill-b" : "react-quill-w";
  const { values, errors, touched, handleChange, handleBlur } = formik;
  const inputStyles = {
    background: "inherit",
    borderColor: currentColor,
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "10px",
    color: "inherit",
  };

  return (
    <RenderMounted>
      <div className="create-blog">
        <div className="create-blog-inputs">
          <Input
            name="title"
            type="text"
            title="Title"
            bodyClasses={"blog-input-title"}
            value={values?.title}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors?.title}
            touched={touched?.title}
            isInitialStyles={false}
            style={inputStyles}
          />
          <Input
            name="preview"
            type="text"
            title="Preview"
            bodyClasses={"blog-input-title"}
            value={values?.preview}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors?.preview}
            touched={touched?.preview}
            isInitialStyles={false}
            style={inputStyles}
          />
          <div>
            <label htmlFor="message">Content</label>
            <ReactQuill
              theme="snow"
              value={messageValue}
              className={`react-quill ${styleTxt}`}
              onChange={handleChangeMessage}
              id="message"
            />
            {messageError && <div className="error-msg">{messageError}</div>}
          </div>
          {imgUrl && (
            <div className="cover-image-check">
              <img src={imgUrl} alt="coverImage" className="cover-image-prev" />
              <button className="cover-img-btn" onClick={handleCancelImage}>
                X
              </button>
            </div>
          )}
          <FileUpload
            name="fileUpload"
            id="fileUpload"
            title="Header Image Upload"
            icon={<Upload width="20" height="20" />}
            style={{ border: `1px solid ${currentColor}` }}
            handleChange={handlePhotoUpload}
          />
        </div>
        <AppButton
          title={edit ? "Save" : "Submit"}
          onClick={handleButtonSubmit}
          className="appButton"
          type="button"
        />
      </div>
    </RenderMounted>
  );
};

export default CreateBlogBody;
