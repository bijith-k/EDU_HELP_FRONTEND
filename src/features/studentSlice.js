import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id:"",
  name: "",
  email: "",
  phone: "",
  board: "",
  branch: "",
  school: "",
  status: "",
  profilePicture:"",
  token: ""
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state._id = action.payload._id
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.branch = action.payload.branch;
      state.board = action.payload.board;
      state.school = action.payload.school;
      state.status = action.payload.status;
      state.profilePicture = action.payload.profilePicture
      state.token = action.payload.token
    },
  },
});

export default studentSlice.reducer;
export const { setStudent } = studentSlice.actions;
