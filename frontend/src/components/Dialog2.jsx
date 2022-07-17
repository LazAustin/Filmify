import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import EditForm from "./EditForm";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles"


const Dialog2 = ({ open, close, purchase}) => {
    const theme=useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
 

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                style={{zIndex: 1800}}
                open={open}
                keepMounted
                onClose={close}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div>
                    <DialogContent>

                        <EditForm purchase={purchase}/>

                    </DialogContent>

                </div>
            </Dialog>
        </>
    )
}

    export default Dialog2;