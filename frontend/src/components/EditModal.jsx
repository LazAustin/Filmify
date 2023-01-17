import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {FaEdit} from 'react-icons/fa'
import EditForm from './EditForm';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 2,
  pb: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};



function ChildModal({purchase}) {
 
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Edit this license</Button>
      <Modal
        hideBackdrop
        style={{overflowY: "auto"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box style={{maxWidth: "80vw", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px"}}>
          <EditForm purchase={purchase} close={handleClose}/>
        </Box>
      </Modal>
    </>
  );
}

export default function ParentModal({purchase}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button 
        onClick={handleOpen} 
        className="edit"
        variant="contained"
        color="primary"
        size="large"
        style={{ margin: 0}}>
          <FaEdit/>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        style={{overflowY: "auto"}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="parent-modal-title">License</h2>
          <p id="parent-modal-description">
            Title: <strong>{purchase.title}</strong><br />
            Producer: <strong>{purchase.producer}</strong><br />
            Director: <strong>{purchase.director}</strong><br />
            Platform: <strong>{purchase.platform}</strong><br />
            Year of Release: <strong>{purchase.year}</strong><br />
            Price: <strong>{purchase.price}</strong><br />
            Length: <strong>{purchase.length}</strong><br />
            Start Date: <strong>{purchase.startDate}</strong><br />
            End Date: <strong>{purchase.endDate}</strong><br />
            Requestor's Name: <strong>{purchase.requesterName}</strong><br />
            Requestor's Email: <strong>{purchase.requesterEmail}</strong><br />
            Requestor's Department: <strong>{purchase.requesterDepartment}</strong><br />
            Notes/Comments: <strong>{purchase.notes}</strong><br />
          </p>
          <ChildModal purchase={purchase}/>
          <Button onClick={handleClose}
          
          >Cancel/Close</Button>

        </Box>
      </Modal>
    </div>
  );
}