import {configureStore} from '@reduxjs/toolkit'
import avatharSlice from './avatarSlice'
import chatInputSlice from './chatInputSlice'
import profileSlice from './profileSlice'
import roomSlice from './roomSlice'
import sidebarToggleSlice from './sidebarToggleSlice'
const store= configureStore({
    reducer:{
        profile:profileSlice.reducer,
        toggle:sidebarToggleSlice.reducer,
        avatar:avatharSlice.reducer,
        room:roomSlice.reducer,
        chat:chatInputSlice.reducer,
    }
})
export default store