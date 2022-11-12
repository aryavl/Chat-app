import {createSlice} from '@reduxjs/toolkit'
const chatInputSlice=createSlice({
    name:'chat',
    initialState:{
        input:'',
        isLoading:false
    },
    reducers:{
        onInputChange(state,action){
            state.input=action.payload
        },
        setIsLoading(state,action){
            state.isLoading=action.payload
        }
    }
})
export const chatInputAction=chatInputSlice.actions;
export default chatInputSlice