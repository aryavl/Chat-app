import React from 'react';

import { Box, Button,Modal, Typography } from '@mui/material';
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const ProfileInfoBtnModal = ({ profile, ...btnProps }) => {
  const { isOpen, close, open } = useModalState();

  const { name, avatar, createdAt } = profile;

  const shortName = profile.name.split(' ')[0];

  const memberSince = new Date(createdAt).toLocaleDateString();

  return (
    <>
      <Button sx={{color:'#000',fontStyle:'italic',":hover":{textDecoration:"underline"}}} {...btnProps} onClick={open}>
        {name}
      </Button>
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
 {shortName}
    </Typography>
    <ProfileAvatar
            src={avatar}
            name={name}
            className="width-200 height-200 img-fullsize font-huge"
          />
                    <h4 className="mt-2">{name}</h4>

<p>Member since {memberSince}</p>
  </Box>

      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;