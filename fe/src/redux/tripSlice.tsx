import { createSlice } from "@reduxjs/toolkit";

const tripSlice = createSlice({
  name: "trip",
  initialState: { trip: {} },
  reducers: {
    updateTrip: (state, action) => {
      state.trip = action.payload;
    },
  },
});

export const { updateTrip } = tripSlice.actions;
export default tripSlice.reducer;
