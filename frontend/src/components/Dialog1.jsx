import Dialog2 from './Dialog2.jsx';
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
const {useSelector} = require('react-redux');

const Dialog1 = ({open, close, purchase}) => {
    const [openDialog2, setOpenDialog2] = useState(false);
    const {user} = useSelector((state) => state.auth);

    return (
        <>
            <div>
                <Dialog2 purchase={purchase} open={openDialog2} onClose={() => setOpenDialog2(false)} />
                <Dialog 
                    style={{width: '50%'}}
                    open={open}
                    keepMounted
                    onClose={close}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >  
                    <div>
                        <DialogContent>
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
                            <Button 
                                variant='outlined'
                                color='primary'
                                onClick={() => setOpenDialog2(true)}>
                                    Edit this License
                            </Button>
                            <br/>
                            <Button 
                                variant='outlined'
                                color='primary'
                                onClick={() => setOpenDialog2(true)}>
                                    Go Back
                            </Button>
                        </DialogContent>
                     </div>
                </Dialog>
            </div>
        </>
    )
}

export default Dialog1;