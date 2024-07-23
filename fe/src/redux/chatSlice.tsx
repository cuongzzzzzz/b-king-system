import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    receiverId: ""
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        updateReceiverId: (state, action) => {
            state.receiverId = action.payload
        },

    },
});

export const { updateReceiverId } = chatSlice.actions;
export default chatSlice.reducer;
