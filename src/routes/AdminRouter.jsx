import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../middleware/PrivateRoutes";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import ErrorPage from "../pages/student/ErrorPage";
import StudentsListPage from "../pages/admin/StudentsListPage";
import ManageVideosPage from "../pages/admin/ManageVideosPage";
import ManageQuestionPapersPage from "../pages/admin/ManageQuestionPapersPage";
import MangageNotesPage from "../pages/admin/MangageNotesPage";
import ManageEventsPage from "../pages/admin/ManageEventsPage";
import TutorsListPage from "../pages/admin/TutorsListPage";
import AddBoardPage from "../pages/admin/AddBoardPage";
import EditBoardPage from "../pages/admin/EditBoardPage";
import BranchListPage from "../pages/admin/BranchListPage";
import AddBranchPage from "../pages/admin/AddBranchPage";
import EditBranchPage from "../pages/admin/EditBranchPage";
import SubjectListPage from "../pages/admin/SubjectListPage";
import AddSubjectPage from "../pages/admin/AddSubjectPage";
import EditSubjectPage from "../pages/admin/EditSubjectPage";
import ManagePlansPage from "../pages/admin/ManagePlansPage";
import AddPlanPage from "../pages/admin/AddPlanPage";
import EditPlansPage from "../pages/admin/EditPlansPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import BoardListPage from "../pages/admin/BoardListPage";

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"admin"} route={"/admin"} />}>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/students" element={<StudentsListPage />} />
        <Route path="/tutors" element={<TutorsListPage />} />
        <Route path="/events" element={<ManageEventsPage />} />

        <Route path="/notes" element={<MangageNotesPage />} />
        <Route path="/question-papers" element={<ManageQuestionPapersPage />} />
        <Route path="/videos" element={<ManageVideosPage />} />
        <Route path="/board" element={<BoardListPage />} />
        <Route path="/add-board" element={<AddBoardPage />} />
        <Route path="/edit-board" element={<EditBoardPage />} />
        <Route path="/branch" element={<BranchListPage />} />
        <Route path="/add-branch" element={<AddBranchPage />} />
        <Route path="/edit-branch" element={<EditBranchPage />} />
        <Route path="/subject" element={<SubjectListPage />} />
        <Route path="/add-subject" element={<AddSubjectPage />} />
        <Route path="/edit-subject" element={<EditSubjectPage />} />
        <Route path="/plans" element={<ManagePlansPage />} />
        <Route path="/add-plans" element={<AddPlanPage />} />
        <Route path="/edit-plans" element={<EditPlansPage />} />
      </Route>

      <Route path="/" element={<AdminLoginPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AdminRouter;
