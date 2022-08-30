import Modal from "react-responsive-modal";

const EditBlogModal = ({ isOpen, handleClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      classNames={{ modal: "", overlay: "" }}>
      <div className="edit__blog__modal"></div>
    </Modal>
  );
};

export default EditBlogModal;
