import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog1 from './Dialog1'
import {FaEdit} from 'react-icons/fa'
import ParentModal from "./EditModal";


export default function EditButton2({purchase}) {
    
    const [openDialog1, setOpenDialog1] = useState(false); 

    return (
        <>
            <div>
                <div>
                    <ParentModal purchase={purchase} open={openDialog1} onClose={() => setOpenDialog1(false)} />
                </div>
                <Button className="edit"
                variant="contained"
                color="primary"
                size="large"
                style={{ margin: 0}}
                onClick={() => setOpenDialog1(true)}><FaEdit/></Button>
            </div>
        </>
    )
}