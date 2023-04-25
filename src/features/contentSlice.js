import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  note: {},
  questionPapers: {},
  videos: {},
  events: {},
  board:{},
  branch:{},
  subject:{},
  plan:{}
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
    setBoardData: (state, action) => {
      state.board = action.payload.board;
    },
    setBranchData: (state, action) => {
      state.branch = action.payload.branch;
    },
    setSubjectData: (state, action) => {
      state.subject = action.payload.subject;
    },
    setPlanData: (state, action) => {
      state.plan = action.payload.plan;
    },
  },
});

export default contentSlice.reducer;
export const { setNoteData, setQuestionData, setVideoData, setEventsData,setBoardData,setBranchData,setPlanData,setSubjectData } =
  contentSlice.actions;
