import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    socket: null,
}

const conversationSlice = createSlice({
    name:"conservation",
    initialState,
    reducers:{
        setSocket: (state,action)=>{
            state.socket = action.payload
        }
    }
})

export const {setSocket} = conversationSlice.actions
export default conversationSlice.reducer