import { Box } from '@mui/material';
import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageItem = ({ message }) => {
  const { authour, createdAt, text } = message;

  return (
    <li className="padded mb-1">
      <Box
      sx={{
        display:'flex',              alignItems:'center',
        fontWeight:'bold',
        // gap:'1rem',
        marginBottom:'5px',
        marginTop:'5px',
        justifyContent:'space-between'

    }}
      >
        <Box sx={{display:'flex',alignItems:'center',gap:'1rem',textTransform:'capitalize'}}>
        <ProfileAvatar
          src={authour.avatar}
          name={authour.name}
          className="ml-1"
          size="xs"
        />

        <span  >{authour.name}</span>
        </Box>
        <ProfileInfoBtnModal
          profile={authour}
          appearance="link"
          className="p-0 ml-1 text-black"
        />
        <TimeAgo
          datetime={createdAt}
          style={{
            fontWeight:'400',
            color: 'rgba(0, 0, 0, 0.45)',

          }}
         
        />
      </Box>

      <div>
        <span 
        style={{
        wordBreak: 'break-all',
      
      }}
        >{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;