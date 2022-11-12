import {createSlice} from '@reduxjs/toolkit'

const roomSlice=createSlice({
    name:'room',
    initialState:{
        room:{
            name:'',
            description:''
        }
    },
    reducers:{
        setRoom(state,action){
            state.room=action.payload
        }
    }
})
export const roomActions=roomSlice.actions;
export default roomSlice