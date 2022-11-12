import {createSlice} from '@reduxjs/toolkit'



const sidebarToggleSlice=createSlice({
    
    name:'toggle',
    initialState:{
        open:false,
        isEditable:false,

    },
    reducers:{
        setOpen(state){
            state.open=!state.open
        },
       
        setIsEditable(state){
            state.isEditable=!state.isEditable;
        }
    }
})
export const sidebarToggleActions=sidebarToggleSlice.actions;
export default sidebarToggleSlice;