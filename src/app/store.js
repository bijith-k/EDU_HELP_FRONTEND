import { configureStore } from '@reduxjs/toolkit'

import studentReducer from '../features/studentSlice'
import tutorReducer from '../features/tutorSlice'
import sidebarReducer from '../features/sidebarSlice'

const store = configureStore({
  reducer: {
    student: studentReducer,
    sidebar: sidebarReducer,
    tutor: tutorReducer,
  }
})

export default store

// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { combineReducers } from "redux";

// import studentReducer from '../features/studentSlice'
// import sidebarReducer from '../features/sidebarSlice'
// import contentReducer from '../features/contentSlice'

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = combineReducers({
//   student: studentReducer,
//   sidebar: sidebarReducer,
//   contents: contentReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);


// import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import { alertsSlice } from "./alertsSlice";
// import { doctorSlice } from "./DoctorSlice";
// import { persistReducer,persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { adminSlice } from "./AdminSlice";

// const rootReducer = combineReducers({
//     alerts: alertsSlice.reducer,
//     doctor: doctorSlice.reducer,
//     admin:adminSlice.reducer
// });

// const persistConfig = {
//     key: "root",
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
// });
// const persistor = persistStore(store);
// export  {store,persistor};