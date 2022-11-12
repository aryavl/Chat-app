import { Button, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useModalState } from '../../../misc/custom-hooks'

const RoomInfoBtnModal = ({currentRoom}) => {
    const {isOpen,close,open}=useModalState()
  return (
    <>
        <Button onClick={open}>Room Information</Button>
    <Modal
         open={isOpen}
         onClose={close}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
    >
  <Box sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "#fff",
    width: { xs: "90%", md: "60%" },
    margin: "5rem auto",
    padding: "3rem 0",
  }}>
    <Typography id="modal-modal-title" variant="h5" component="h2">
     About {currentRoom.name}
    </Typography>
    <Typography variant="h6" id="modal-modal-description" sx={{ mt: 2 }}>
      Description
    </Typography>
    <Typography  id="modal-modal-description" sx={{ mt: 2 }}>
      {currentRoom.description}
    </Typography>
  </Box>
</Modal>
    </>
  )
}

export default RoomInfoBtnModal