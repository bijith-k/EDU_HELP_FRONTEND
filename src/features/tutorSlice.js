import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tutor:null
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    setTutor: (state, action) => {
      state.tutor = action.payload.tutor
    },
  },
});

export default tutorSlice.reducer;
export const { setTutor } = tutorSlice.actions;
