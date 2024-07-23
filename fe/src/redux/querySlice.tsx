import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "bus",
  departureDate: "",
  departureStation: "",
  arrivalStation: "",
  limit: 10,
  page: 1,
  sortBy: "price",
  sortDirection: "asc",
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { updateQuery, updateType } = querySlice.actions;
export default querySlice.reducer;
