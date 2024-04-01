import { Modal } from "@mui/material";
import PropTypes from "prop-types";

const FormModal = ({ open, onClose, children}) => {
  return (
    <Modal open={open} onClose={onClose} className="">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-4 rounded-lg mx-auto">
        {children}
      </div>
    </Modal>
  )
}

FormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default FormModal