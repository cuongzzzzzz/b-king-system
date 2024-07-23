import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    numberofTickets: 1,
    ticketPrice: 0,
    totalPrice: 0,
    tripId: "",
    paymentMethod: {},
    notes: "",
    passengerName: "",
    phoneNumber: "",
    address: "",
    email: "",
    carrierId: ""
  },
  reducers: {
    updateTickets: (state, action) => {
      state.numberofTickets = action.payload.numberTicket;
      state.ticketPrice = action.payload.ticketPrice;
      state.totalPrice = action.payload.totalPrice;
      state.tripId = action.payload.tripId;
      state.notes = action.payload.notes;
      state.carrierId = action.payload.carrierId
    },
    updateBookingUserInfo: (state, action) => {
      state.passengerName = action.payload.passengerName;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.paymentMethod = action.payload.paymentMethod;
    },
  },
});

export const { updateTickets, updateBookingUserInfo } = ticketSlice.actions;
export default ticketSlice.reducer;
