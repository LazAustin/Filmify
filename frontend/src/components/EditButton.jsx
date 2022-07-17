import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPurchase, getPurchases, reset } from '../features/purchases/purchaseSlice';
import { FaEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import purchaseService from '../features/purchases/purchaseService';
import EditForm from './EditForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
  
    setOpen(true);
}
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Edit this License</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Edit this license below</h2>
          <EditForm />
          <Button onClick={handleClose}>Submit Edit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  );
}

const EditButton = (purchase) => {
  
     const navigate = useNavigate()
     const dispatch = useDispatch()
     //const { user } = useSelector((state) => state.auth)
    //const {purchase, isError, message} = useSelector((state) => state.purchase)
     //const { purchases, isError, message } = useSelector((state) => state.purchases)
     //const purchase = await purchases.findById(id)
    //const [purchase, setPurchase] = useState(purchases.findById(id))

    

    // useEffect(() => {
    //     if (isError) {
    //         console.log(message);
    //         //console.log(purchase.title)
    //     }

    //     if (!user) {
    //         navigate('/login')
    //     }
    //     console.log()
    //     dispatch(getPurchase());

    // }, [user, navigate, isError, message, dispatch])
  
   
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}
                className="edit"
                variant="contained"
                color="primary"
                size="large"
                style={{ margin: 0}}
        >
            <FaEdit />
        </Button>
      <Modal
        
        open={open}
        onClose={handleClose}
        // aria-labelledby="parent-modal-title"
        // aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Your License</h2>
          <p id="parent-modal-description">
            Title: <strong>{purchase.title}</strong><br />
            Producer: <strong>{purchase.producer}</strong><br />
            Director: <strong>{purchase.director}</strong><br />
            Platform: <strong>{purchase.platform}</strong><br />
            Year of Release: <strong>{purchase.year}</strong><br />
            Price: <strong>{purchase.price}</strong><br />
            Length: <strong>{purchase.length}</strong><br />
            Requester Name: <strong>{purchase.requesterName}</strong><br />
            Requester Email: <strong>{purchase.requesterEmail}</strong><br />
            Requester Department: <strong>{purchase.requesterDepartment}</strong><br />
            Notes/Comments: <strong>{purchase.notes}</strong><br />
          </p>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}

export default EditButton;