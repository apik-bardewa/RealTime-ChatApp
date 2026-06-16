import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUser:null,
        selectedUser:null
    
    },
    reducers:{
        setuserData:(state,action)=>{
         state.userData=action.payload
        },
        setOtheruser:(state,action)=>{
         state.otherUser=action.payload
        },
        setSelecteduser:(state,action)=>{
         state.selectedUser=action.payload
        }
    }
})

export const {setuserData,setOtheruser,setSelecteduser}=userSlice.actions
export  default userSlice.reducer

