import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  note: {},
  questionPapers: {},
  videos: {},
  events: {},
};

const contentSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    setNoteData: (state, action) => {
      state.note = action.payload.note;
    },
    setQuestionData: (state, action) => {
      state.questionPapers = action.payload.questionPapers;
    },
    setVideoData: (state, action) => {
      state.videos = action.payload.videos;
    },
    setEventsData: (state, action) => {
      state.events = action.payload.events;
    },
  },
});

export default contentSlice.reducer;
export const { setNoteData, setQuestionData, setVideoData, setEventsData } =
  contentSlice.actions;
