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
  status: "",
  token: "",
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
      state.timeFrom = action.payload.timeFrom;
      state.timeTo = action.payload.timeTo;
      state.profession = action.payload.profession;
      state.status = action.payload.status;
      state.token = action.payload.token;
    },
  },
});

export default tutorSlice.reducer;
export const { setTutor } = tutorSlice.actions;
