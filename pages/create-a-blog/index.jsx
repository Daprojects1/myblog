import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import useStyles from "../../utils/useStyles";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Input from "../../reusableComps/Input";
import AppButton from "../../reusableComps/Appbutton";
import FileUpload from "../../reusableComps/FileUpload";
import Upload from "../../components/Svgs/Upload";
import * as Yup from "yup";
import { useFormik } from "formik";
import useCreateBlog from "../../hooks/BlogData/useCreateBlog";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const initialValues = {
    title: "",
    preview: "",
    image: "",
  };

  const { createBlog } = useCreateBlog();

  const [image, setImage] = useState({});
  const [imgUrl, setImageUrl] = useState("");

  const formik = useFormik({
    initialValues,
    onSubmit: (vals) => {
      const newVals = {
        ...vals,
        message: messageValue,
        image,
        preview: `${vals.preview.substring(0, 80)}...`,
      };
      const formData = new FormData();

      Object.entries(newVals).map(
        ([key, val]) => formData.append(`${key}`, val)
        // console.log(key, val)
      );

      createBlog(formData);
      // console.log(newVals);
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter a title"),
      preview: Yup.string()
        .required("Please enter a preview")
        .test("len", "Please have a more detailed preview", (val) => {
          return val?.length > 80;
        }),
    }),
  });

  const [messageValue, setMessageValue] = useState("");
  const [messageValue2, setMessageValue2] = useState("");
  const [messageError, setMessageValueError] = useState("");

  const { handleBlur, handleChange, errors, touched, values, handleSubmit } =
    formik;

  const { checked, light, dark, currentColor } = useStyles();
  const styleTxt = checked ? "react-quill-b" : "react-quill-w";

  // Functions for handling logic
  const showMessageError = () => {
    if (
      messageValue.length === messageValue2.length &&
      messageValue2.length !== 0
    ) {
      console.log("not done");
      setMessageValueError("Sorry, please include a more detailed blog post !");
    }
    if (
      messageValue.length > messageValue2.length &&
      messageValue2.length !== 0
    )
      setMessageValueError("");
  };

  const handleChangeMessage = (...data) => {
    showMessageError();
    setMessageValue(...data);
  };

  const handlePhotoUpload = (e) => {
    const imgFile = e.target.files[0];
    console.log(imgFile);
    const match = ["image/jpeg", "image/png"];
    if (match.indexOf(imgFile?.type) !== -1) {
      setImage(imgFile);
      toast.success("Image succesfully added");
      // const reader = new FileReader();
      // const url = reader.readAsDataURL(imgFile);
      const url = URL.createObjectURL(imgFile);
      console.log(url);
      setImageUrl(url);
      return;
    }

    toast.error("Please select a JPG/PNG image");
  };

  const handleButtonSubmit = () => {
    if (messageValue?.length < 100) {
      setMessageValueError("Sorry, please include a more detailed blog post !");
      setMessageValue2(messageValue);
    }
    handleSubmit();
  };
  // Finish up the UI for the post form.

  const inputStyles = {
    background: "inherit",
    borderColor: currentColor,
    borderWidth: "1px",
    borderStyle: "solid",
    padding: "10px",
    color: "inherit",
  };
  return (
    <div className="create-blog">
      <div className="create-blog-inputs">
        <Input
          name="title"
          type="text"
          title="Title"
          bodyClasses={"blog-input-title"}
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors.title}
          touched={touched.title}
          isInitialStyles={false}
          style={inputStyles}
        />
        <Input
          name="preview"
          type="text"
          title="Preview"
          bodyClasses={"blog-input-title"}
          value={values.preview}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors.preview}
          touched={touched.preview}
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
          <div className="error-msg">{messageError && messageError}</div>
        </div>
        {imgUrl && (
          <div className="cover-image-check">
            <img src={imgUrl} alt="coverImage" className="cover-image-prev" />
            <button className="cover-img-btn" onClick={() => setImageUrl("")}>
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
        title="Submit"
        onClick={handleButtonSubmit}
        className="appButton"
        type="button"
      />
      {/* <img src={imgUrl} alt="imageBody" /> */}
    </div>
  );
};

export default CreateBlog;
