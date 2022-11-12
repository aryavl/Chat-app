import {createSlice} from '@reduxjs/toolkit'



const profileSlice=createSlice({
    name:'profile',
    initialState:{
        profile:[],
        isLoading:false,
       
    },
    reducers:{
        setProfile(state,actions){
            // console.log(actions.payload)
            state.profile = actions.payload
            // console.log("profile",state.profile)

        },
        setIsLoading(state,action){
            state.isLoading=action.payload
        },
    }
})
export const profileActions=profileSlice.actions;
export default profileSlice;