import React from "react";
import { Route, Routes } from "react-router-dom";
import TutorLoginPage from "../pages/Tutor/TutorLoginPage";
import TutorSignUpPage from "../pages/Tutor/TutorSignUpPage";
import OtpPageTutor from "../pages/Tutor/OtpPageTutor";
import PrivateRoutes from "../middleware/PrivateRoutes";
import ApprovalPending from "../pages/Tutor/ApprovalPending";
import ApprovalRejected from "../pages/Tutor/ApprovalRejected";
import TutorDashboardPage from "../pages/Tutor/TutorDashboardPage";
import TutorSettingsPage from "../pages/Tutor/TutorSettingsPage";
import UploadsPage from "../pages/Tutor/UploadsPage";
import TutorUploadNotesPage from "../pages/Tutor/TutorUploadNotesPage";
import TutorUploadQuestionsPage from "../pages/Tutor/TutorUploadQuestionsPage";
import TutorUploadVideosPage from "../pages/Tutor/TutorUploadVideosPage";
import TutorAddEventsPage from "../pages/Tutor/TutorAddEventsPage";
import TutorChatPage from "../pages/Tutor/TutorChatPage";
import TutorEditProfilePage from "../pages/Tutor/TutorEditProfilePage";
import Tutor404 from "../components/Error/Tutor404";

const TutorRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"tutor"} route={"/tutor"} />}>
        <Route path="/dashboard" element={<TutorDashboardPage />} />
        <Route path="/settings" element={<TutorSettingsPage />} />
        <Route path="/uploads" element={<UploadsPage />} />
        <Route path="/upload-notes" element={<TutorUploadNotesPage />} />
        <Route
          path="/upload-questions"
          element={<TutorUploadQuestionsPage />}
        />
        <Route path="/upload-videos" element={<TutorUploadVideosPage />} />
        <Route path="/add-events" element={<TutorAddEventsPage />} />
        <Route path="/chat" element={<TutorChatPage />} />
        <Route path="edit-profile" element={<TutorEditProfilePage />} />
        <Route path="/approval-pending" element={<ApprovalPending />} />
        <Route path="/approval-rejected" element={<ApprovalRejected />} />
      </Route>

      <Route path="/" element={<TutorLoginPage />} />
      <Route path="/signup" element={<TutorSignUpPage />} />
      <Route path="/otp" element={<OtpPageTutor />} />

      <Route path="/*" element={<Tutor404 />} />
    </Routes>
  );
};

export default TutorRouter;
