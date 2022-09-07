import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Modal from "react-responsive-modal";
import CreateBlogBody from "../CreateBlog";
import useEditBlog from "../../hooks/BlogData/useEditBlogData";
import apiEndPoints from "../../constants/apiEndpoints";

const EditBlogModal = ({ isOpen, handleClose, data }) => {
  const imgPhoto = data?.image ? `${apiEndPoints.server}${data?.image}` : "";

  const initialValues = {
    title: data?.title,
    preview: data?.preview,
    image: data?.image,
  };

  const { editBlog } = useEditBlog();

  // const { createBlog } = useCreateBlog();

  const [image, setImage] = useState("");
  const [imgUrl, setImageUrl] = useState(imgPhoto);

  const formik = useFormik({
    initialValues,
    onSubmit: (vals) => {
      const newVals = {
        ...vals,
        message: messageValue,
        image: image ? image : imgUrl ? data?.image : "",
      };
      const formData = new FormData();

      console.log(newVals.image);
      Object.entries(newVals).map(
        ([key, val]) => formData.append(`${key}`, val)
        // console.log(key, val)
      );

      editBlog(data?._id, formData);
      handleClose();
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

  const [messageValue, setMessageValue] = useState(data?.message);
  const [messageValue2, setMessageValue2] = useState("");
  const [messageError, setMessageValueError] = useState("");

  const { handleSubmit } = formik;

  // Functions for handling logic
  const showMessageError = () => {
    if (
      messageValue.length === messageValue2.length &&
      messageValue2.length !== 0
    ) {
      console.log(messageValue.length, messageValue2.length);
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
    // console.log(imgFile);
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

  const handleCancelImage = () => {
    setImageUrl("");
    setImage("");
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      classNames={{ modal: "edit__blog__modal", overlay: "" }}>
      <div className="edit__blog__body">
        <CreateBlogBody
          formik={formik}
          handleChangeMessage={handleChangeMessage}
          handleButtonSubmit={handleButtonSubmit}
          handlePhotoUpload={handlePhotoUpload}
          imgUrl={imgUrl}
          setImageUrl={setImageUrl}
          messageError={messageError}
          messageValue={messageValue}
          handleCancelImage={handleCancelImage}
          edit={true}
        />
      </div>
    </Modal>
  );
};

export default EditBlogModal;
