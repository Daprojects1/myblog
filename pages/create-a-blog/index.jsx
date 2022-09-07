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
import RenderMounted from "../../reusableComps/RenderMounted";
import { toast } from "react-toastify";
import CreateBlogBody from "../../components/CreateBlog";

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
    const match = ["image/jpeg", "image/png"];
    if (match.indexOf(imgFile?.type) !== -1) {
      setImage(imgFile);
      toast.success("Image succesfully added");
      // const reader = new FileReader();
      // const url = reader.readAsDataURL(imgFile);
      const url = URL.createObjectURL(imgFile);
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

  const handleCancelImage = () => {
    setImageUrl("");
    setImage("");
  };

  // EXtract this into another component so that it can be reused for the edit blog modal.
  return (
    <CreateBlogBody
      formik={formik}
      handleChangeMessage={handleChangeMessage}
      handleButtonSubmit={handleButtonSubmit}
      handlePhotoUpload={handlePhotoUpload}
      messageError={messageError}
      messageValue={messageValue}
      imgUrl={imgUrl}
      handleCancelImage={handleCancelImage}
    />
  );
};

export default CreateBlog;
