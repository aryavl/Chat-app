import {
  Button,
  FormGroup,
  FormLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { serverTimestamp, ref, push, onValue, off } from 'firebase/database';
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModalState } from "../../misc/custom-hooks";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { avatarActions } from "../../store/avatarSlice";
import { auth, database } from "../../misc/firebase";
import { transformToArrWithId } from "../../misc/helpers";
import { roomActions } from "../../store/roomSlice";


const CreateRoomBtnModal = () => {
  const dispatch=useDispatch()
  const formLoading=useSelector(state=>state.avatar.formLoading)
  const room=useSelector(state=>state.room.room)
  const INITIAL_FORM = {
    name: '',
    description: '',
  };
  
  useEffect(() => {
    const roomListRef = ref(database, 'rooms');

    onValue(roomListRef, snap => {
        const data = transformToArrWithId(snap.val());
        // console.log(data);
      dispatch(roomActions.setRoom(data));
    });

    return () => {
      off(roomListRef);
    };
  }, [dispatch]);
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    dispatch(roomActions.setRoom({ ...room, [name]: value }));
  };
  // console.log(!formRef.current.check());
  const { isOpen, open, close } = useModalState();
  const onSubmit = async () => {

    dispatch(avatarActions.setFormLoading(true))

    const newRoomdata = {
      ...room,
      createdAt: serverTimestamp(),
      admins: {
        [auth.currentUser.uid]: true,
      },
      fcmUsers: {
        [auth.currentUser.uid]: true,
      },
    };
console.log("hrll",newRoomdata)
    try {
      await push(ref(database, 'rooms'), newRoomdata);
      
      alert(`${room.name} has been created`, 4000);
      dispatch(avatarActions.setFormLoading(false))
     
      dispatch(roomActions.setRoom(INITIAL_FORM));
      close();
    } catch (err) {
      dispatch(avatarActions.setFormLoading(false))
    }
  };


  return (
    <>
      <Button
        variant="contained"
        color="success"
        sx={{ width: { xs: "100%", textTransform: "capitalize" } }}
        onClick={open}
      >
        <AddCircleIcon />
        create new chat room
      </Button>
      <Modal
        open={isOpen}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{padding:'0 3rem'}}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "#fff",
            width: { xs: "90%", md: "60%" },
            margin: "5rem auto",
            padding: "3rem 0",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            create new chat room
          </Typography>
          <form>
          <FormGroup sx={{marginTop:'1rem',marginBottom:'1rem'}}>
            <FormLabel> Room Name</FormLabel>
            <TextField
              required
              id="fullWidth"
              sx={{ width: "50vw" }}
              name="name"
              value={room.name}
              onChange={handleInputs}
              variant="outlined"
            />
          </FormGroup>
          <FormGroup sx={{marginBottom:'2rem'}}>
            <FormLabel>Room Description </FormLabel>
            <TextField
              required
              id="outlined-multiline-static"
              sx={{ width: "50vw" }}
              multiline
              rows={4}
              name="description"
              value={room.description}
              onChange={handleInputs}
            />
          </FormGroup>
          </form>
          
          <Button
            type="submit"
            variant="outlined"
            onClick={onSubmit}
            disabled={formLoading}
            sx={{ display: "block" }}
          >
            Create new chat room
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CreateRoomBtnModal;
