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

const CreateBlog = () => {
  const initialValues = {
    title: "",
    image: "",
  };

  const { createBlog } = useCreateBlog();

  const formik = useFormik({
    initialValues,
    onSubmit: (vals) => {
      const newVals = { ...vals, message: messageValue };
      createBlog(newVals);
      console.log(newVals);
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter a title"),
    }),
  });

  const [messageValue, setMessageValue] = useState("");
  const [messageValue2, setMessageValue2] = useState("");
  const [messageError, setMessageValueError] = useState("");
  const [isTyping, setTyping] = useState(false);

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
    console.log(e.target.files);
  };

  const handleButtonSubmit = () => {
    if (messageValue?.length < 100) {
      setMessageValueError("Sorry, please include a more detailed blog post !");
      setMessageValue2(messageValue);
    }
    handleSubmit();
  };
  // Finish up the UI for the post form.

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
          style={{
            background: "inherit",
            borderColor: currentColor,
            borderWidth: "1px",
            borderStyle: "solid",
            padding: "10px",
            color: "inherit",
          }}
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
    </div>
  );
};

export default CreateBlog;
