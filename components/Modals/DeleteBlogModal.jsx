import Modal from "react-responsive-modal";
import Appbutton from "../../reusableComps/Appbutton";
import RenderIf from "../../reusableComps/RenderIf";
import useStyles from "../../utils/useStyles";

const DeleteBlogModal = ({ isOpen, handleClose, handleDelete }) => {
  return (
    <RenderIf isTrue={isOpen}>
      <Modal
        open={isOpen}
        onClose={handleClose}
        classNames={{ modal: `delete__blog__modal`, overlay: "" }}>
        <div className="delete__blog__body">
          <h2>Delete Blog</h2>
          <p>Are you sure you would like to delete this blog post ?</p>
          <div className="delete__modal__buttons">
            <Appbutton
              title={"Cancel"}
              className="appButton cancel"
              onClick={handleClose}
            />
            <Appbutton
              title={"Delete"}
              className="appButton delete"
              onClick={handleDelete}
            />
          </div>
        </div>
      </Modal>
    </RenderIf>
  );
};

export default DeleteBlogModal;
