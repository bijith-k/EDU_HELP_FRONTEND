import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentLoginPage from "../pages/student/StudentLoginPage";
import StudentSignUpPage from "../pages/student/StudentSignUpPage";
import OtpPageStudent from "../pages/student/OtpPageStudent";
import ErrorPage from "../pages/student/ErrorPage";
import HomePage from "../pages/student/HomePage";
import PrivateRoutes from "../middleware/PrivateRoutes";
import NotesPage from "../pages/student/NotesPage";
import EventsPage from "../pages/student/EventsPage";
import NewsPage from "../pages/student/NewsPage";
import PlansPage from "../pages/student/PlansPage";
import TutorsListPage from "../pages/student/TutorsListPage";
import UploadNotesPage from "../pages/student/UploadNotesPage";
import UploadVideosPage from "../pages/student/UploadVideosPage";
import UploadQuestionPapersPage from "../pages/student/UploadQuestionPapersPage";
import AddEventsPage from "../pages/student/AddEventsPage";
import MyUploadsPage from "../pages/student/MyUploadsPage";
import ProfilePage from "../pages/student/ProfilePage";
import SettingsPage from "../pages/student/SettingsPage";
import StudentChatPage from "../pages/student/StudentChatPage";
import FavouritesPage from "../pages/student/FavouritesPage";

const StudentRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"student"} route={"/signin"} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/tutors" element={<TutorsListPage />} />
        <Route path="/upload-notes" element={<UploadNotesPage />} />
        <Route path="/upload-videos" element={<UploadVideosPage />} />
        <Route
          path="/upload-question-paper"
          element={<UploadQuestionPapersPage />}
        />
        <Route path="/add-events" element={<AddEventsPage />} />
        <Route path="/my-uploads" element={<MyUploadsPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/chats" element={<StudentChatPage />} />
      </Route>

      <Route path="/signin" element={<StudentLoginPage />} />
      <Route path="/signup" element={<StudentSignUpPage />} />
      <Route path="/otp" element={<OtpPageStudent />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default StudentRouter;
