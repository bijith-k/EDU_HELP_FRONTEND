import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id:"",
  name: "",
  email: "",
  phone: "",
  subjects:'',
  timeFrom:'',
  timeTo:'',
  profession:'',
  board: "",
  branch: "",
  place:"",
  status: "",
  token: "",
  rejection_reason:""
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    setTutor: (state, action) => {
      state._id = action.payload._id
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.subjects = action.payload.subjects;
      state.branch = action.payload.branch;
      state.board = action.payload.board;
      state.timeFrom = action.payload.timeFrom;
      state.timeTo = action.payload.timeTo;
      state.profession = action.payload.profession;
      state.place = action.payload.place
      state.status = action.payload.status;
      state.token = action.payload.token;
      state.rejection_reason = action.payload.rejection_reason
    },
  },
});

export default tutorSlice.reducer;
export const { setTutor } = tutorSlice.actions;
