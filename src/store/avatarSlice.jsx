import {createSlice} from '@reduxjs/toolkit'
const avatharSlice=createSlice({
    name:'avatar',
    initialState:{
        isOpen:false,
        room:{
                name: '',
                description: '',},
        formLoading:false,
    },
    reducers:{
        open(state){state.isOpen=true},
        close(state){state.isOpen=false},
        setRoom(state,action){
            state.formValue=action.payload
        },
        setFormLoading(state,action){
            state.formLoading=action.payload
        }
    }
})
export const avatarActions=avatharSlice.actions;
export default avatharSlice