import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import useStyles from "../../utils/useStyles";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Input from "../../reusableComps/Input";
import AppButton from "../../reusableComps/Appbutton";
import { useFormik } from "formik";

const CreateBlog = () => {
  const initialValues = {
    title: "",
    image: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (vals) => {
      if (messageValue?.length < 100) {
        setMessageValueError(
          "Sorry, please include a more detailed blog post !"
        );
        setMessageValue2(messageValue);
        return;
      }
      const newVals = { ...vals, message: messageValue };
      console.log(newVals);
    },
    validationSchema: "",
  });
  const [messageValue, setMessageValue] = useState("");
  const [messageValue2, setMessageValue2] = useState("");
  const [messageError, setMessageValueError] = useState("");

  const { handleBlur, handleChange, errors, touched, values, handleSubmit } =
    formik;
  const { checked } = useStyles();
  const styleTxt = checked ? "react-quill-b" : "react-quill-w";

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
  return (
    <div>
      <Input
        name="title"
        type="text"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.title}
        touched={touched.title}
      />
      <ReactQuill
        theme="snow"
        value={messageValue}
        className={`react-quill ${styleTxt}`}
        onChange={handleChangeMessage}
        id="message"
      />
      <div className="error-msg">{messageError && messageError}</div>
      <AppButton
        title="Submit"
        onClick={handleSubmit}
        className="appButton"
        type="button"
      />
    </div>
  );
};

export default CreateBlog;
