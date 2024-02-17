import { Box, Modal } from '@mui/material';
import './GenericModel.css';

const GenericModal = ({ open, handleClose, children, classNameModal, classNameBox }) => {
    const modalClass = classNameModal || 'modal-default'; 
    const boxClass = classNameBox || 'modal-box-default'; 
    return (
        <Modal open={open} onClose={handleClose} className={modalClass}>
            <Box className={boxClass}>
                {children}
            </Box>
        </Modal>
    );
}

export default GenericModal;