import './App.css'
import { BrowserRouter, Route, Routes , Navigate } from 'react-router-dom'
import { AuthorizeStudent, RedirectStudent } from './middleware/authStudent'
import { AuthorizeTutor, RedirectTutor } from './middleware/authTutor'
import { AuthorizeAdmin,RedirectAdmin } from './middleware/authAdmin'
import HomePage from './pages/student/HomePage'
import StudentLoginPage from './pages/student/StudentLoginPage'
import StudentSignUpPage from './pages/student/StudentSignUpPage'
import NotesPage from './pages/student/NotesPage'
import TutorLoginPage from './pages/Tutor/TutorLoginPage'
import TutorSignUpPage from './pages/Tutor/TutorSignUpPage'
import UploadNotesPage from './pages/student/UploadNotesPage'
import OtpPageStudent from './pages/student/OtpPageStudent'
import OtpPageTutor from './pages/Tutor/OtpPageTutor'
import UploadVideosPage from './pages/student/UploadVideosPage'
import UploadQuestionPapersPage from './pages/student/UploadQuestionPapersPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import { ToastContainer } from 'react-toastify'
import BoardListPage from './pages/admin/BoardListPage'
import AddBoardPage from './pages/admin/AddBoardPage'
import BranchListPage from './pages/admin/BranchListPage'
import AddBranchPage from './pages/admin/AddBranchPage'
import SubjectListPage from './pages/admin/SubjectListPage'
import AddSubjectPage from './pages/admin/AddSubjectPage'
import MangageNotesPage from './pages/admin/MangageNotesPage'
import ManageQuestionPapersPage from './pages/admin/ManageQuestionPapersPage'
import ManageVideosPage from './pages/admin/ManageVideosPage'
import EditVideosPage from './pages/admin/EditVideosPage'
import EditNotesPage from './pages/admin/EditNotesPage'
import EditQuestionPaperPage from './pages/admin/EditQuestionPaperPage'
import TutorDashboardPage from './pages/Tutor/TutorDashboardPage'
import TutorEditProfilePage from './pages/Tutor/TutorEditProfilePage'
import UploadsPage from './pages/Tutor/UploadsPage'
import TutorUploadVideosPage from './pages/Tutor/TutorUploadVideosPage'
import TutorUploadQuestionsPage from './pages/Tutor/TutorUploadQuestionsPage'
import TutorUploadNotesPage from './pages/Tutor/TutorUploadNotesPage'
import TutorAddEventsPage from './pages/Tutor/TutorAddEventsPage'
import AddEventsPage from './pages/student/AddEventsPage'
import ManageEventsPage from './pages/admin/ManageEventsPage'
import EditEventsPage from './pages/admin/EditEventsPage'
import MyUploadsPage from './pages/student/MyUploadsPage'
import EventsPage from './pages/student/EventsPage'
import TutorsList from './pages/student/TutorsList'
import PlansPage from './pages/student/PlansPage'
import ManagePlansPage from './pages/admin/ManagePlansPage'
import AddPlanPage from './pages/admin/AddPlanPage'
import EditPlansPage from './pages/admin/EditPlansPage'
import StudentsListPage from './pages/admin/StudentsListPage'
import TutorsListPage from './pages/admin/TutorsListPage'
import ProfilePage from './pages/student/ProfilePage'
import SettingsPage from './pages/student/SettingsPage'
import StudentChatPage from './pages/student/StudentChatPage'
import TutorChatPage from './pages/Tutor/TutorChatPage'
import TutorSettingsPage from './pages/Tutor/TutorSettingsPage'
import ApprovalPending from './pages/Tutor/ApprovalPending'
import ApprovalRejected from './pages/Tutor/ApprovalRejected'
import EditBoardPage from './pages/admin/EditBoardPage'
import EditBranchPage from './pages/admin/EditBranchPage'
import EditSubjectPage from './pages/admin/EditSubjectPage'
import NewsPage from './pages/student/NewsPage'
 
 
function App() {
    
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            // element={ student.token != '' ? <HomePage /> : <Navigate to='/login' />}
            element={
              <AuthorizeStudent>
                <HomePage />
              </AuthorizeStudent>
            }
          />
          <Route
            path="/signin"
            // element={ student.token === '' ? <StudentLoginPage /> : <Navigate to='/' /> }
            element={
              <RedirectStudent>
                <StudentLoginPage />
              </RedirectStudent>
            }
          />
          <Route
            path="/signup"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={
              <RedirectStudent>
                <StudentSignUpPage />
              </RedirectStudent>
            }
          />
          <Route
            path="/otp"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={
              <RedirectStudent>
                <OtpPageStudent />
              </RedirectStudent>
            }
          />
          <Route
            path="/notes"
            element={
              <AuthorizeStudent>
                <NotesPage />
              </AuthorizeStudent>
            }
          />
          <Route
            path="/events"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={
              <AuthorizeStudent>
                <EventsPage />
              </AuthorizeStudent>
            }
          />
          <Route
            path="/news"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={
              <AuthorizeStudent>
                <NewsPage />
              </AuthorizeStudent>
            }
          />
          <Route
            path="/plans"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={
              <AuthorizeStudent>
                <PlansPage />
              </AuthorizeStudent>
            }
          />
          <Route
            path="/tutors"
            element={
              <AuthorizeStudent>
                <TutorsList />
              </AuthorizeStudent>
            }
          />
          <Route
            path="/upload-notes"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={
              <AuthorizeStudent>
                <UploadNotesPage />
              </AuthorizeStudent>
            }
          />
          <Route
            path="/upload-videos"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={
              <AuthorizeStudent>
                <UploadVideosPage />
              </AuthorizeStudent>
            }
          />
          <Route
            path="/upload-question-paper"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={
              <AuthorizeStudent>
                <UploadQuestionPapersPage />
              </AuthorizeStudent>
            }
          />

          <Route
            path="/add-events"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={
              <AuthorizeStudent>
                <AddEventsPage />
              </AuthorizeStudent>
            }
          />
          <Route
            path="/my-uploads"
            element={
              <AuthorizeStudent>
                <MyUploadsPage />
              </AuthorizeStudent>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthorizeStudent>
                <ProfilePage />
              </AuthorizeStudent>
            }
          />
          <Route
            path="/settings"
            element={
              <AuthorizeStudent>
                <SettingsPage />
              </AuthorizeStudent>
            }
          />

          <Route
            path="/tutor-signin"
            element={
              <RedirectTutor>
                <TutorLoginPage />
              </RedirectTutor>
            }
          />
          <Route path="/tutor-approval-pending" element={<ApprovalPending />} />
          <Route
            path="/tutor-approval-rejected"
            element={<ApprovalRejected />}
          />
          <Route
            path="/tutor-otp"
            element={
              <RedirectTutor>
                <OtpPageTutor />
              </RedirectTutor>
            }
          />
          <Route
            path="/tutor-signup"
            element={
              <RedirectTutor>
                <TutorSignUpPage />
              </RedirectTutor>
            }
          />
          <Route
            path="/tutor-dashboard"
            element={
              <AuthorizeTutor>
                <TutorDashboardPage />
              </AuthorizeTutor>
            }
          />
          <Route
            path="/tutor-settings"
            element={
              <AuthorizeTutor>
                <TutorSettingsPage />
              </AuthorizeTutor>
            }
          />
          <Route
            path="/tutor-uploads"
            element={
              <AuthorizeTutor>
                <UploadsPage />
              </AuthorizeTutor>
            }
          />
          <Route
            path="/tutor-upload-notes"
            element={
              <AuthorizeTutor>
                <TutorUploadNotesPage />
              </AuthorizeTutor>
            }
          />
          <Route
            path="/tutor-upload-questions"
            element={
              <AuthorizeTutor>
                <TutorUploadQuestionsPage />
              </AuthorizeTutor>
            }
          />
          <Route
            path="/tutor-upload-videos"
            element={
              <AuthorizeTutor>
                <TutorUploadVideosPage />
              </AuthorizeTutor>
            }
          />
          <Route
            path="/tutor-add-events"
            element={
              <AuthorizeTutor>
                <TutorAddEventsPage />
              </AuthorizeTutor>
            }
          />

          <Route
            path="/admin"
            element={
              <RedirectAdmin>
                <AdminLoginPage />
              </RedirectAdmin>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <AuthorizeAdmin>
                <AdminDashboard />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-board"
            element={
              <AuthorizeAdmin>
                <BoardListPage />
              </AuthorizeAdmin>
            }
          />

          <Route
            path="/chats"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={
              <AuthorizeAdmin>
                <StudentChatPage />
              </AuthorizeAdmin>
            }
          />

          <Route
            path="/tutor-chat"
            element={
              <AuthorizeTutor>
                <TutorChatPage />
              </AuthorizeTutor>
            }
          />
          <Route
            path="/tutor-edit-profile"
            element={
              <AuthorizeTutor>
                <TutorEditProfilePage />
              </AuthorizeTutor>
            }
          />
          <Route
            path="/admin-tutors"
            element={
              <AuthorizeAdmin>
                <TutorsListPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-students"
            element={
              <AuthorizeAdmin>
                <StudentsListPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-events"
            element={
              <AuthorizeAdmin>
                <ManageEventsPage />
              </AuthorizeAdmin>
            }
          />

          <Route
            path="/admin-notes"
            element={
              <AuthorizeAdmin>
                <MangageNotesPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-question-papers"
            element={
              <AuthorizeAdmin>
                <ManageQuestionPapersPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-videos"
            element={
              <AuthorizeAdmin>
                <ManageVideosPage />
              </AuthorizeAdmin>
            }
          />

          <Route
            path="/admin-edit-videos"
            element={
              <AuthorizeAdmin>
                <EditVideosPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-edit-notes"
            element={
              <AuthorizeAdmin>
                <EditNotesPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-edit-question-papers"
            element={
              <AuthorizeAdmin>
                <EditQuestionPaperPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-edit-events"
            element={
              <AuthorizeAdmin>
                <EditEventsPage />
              </AuthorizeAdmin>
            }
          />

          <Route
            path="/admin-add-board"
            element={
              <AuthorizeAdmin>
                <AddBoardPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-edit-board"
            element={
              <AuthorizeAdmin>
                <EditBoardPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-branch"
            element={
              <AuthorizeAdmin>
                <BranchListPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-add-branch"
            element={
              <AuthorizeAdmin>
                <AddBranchPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-edit-branch"
            element={
              <AuthorizeAdmin>
                <EditBranchPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-subject"
            element={
              <AuthorizeAdmin>
                <SubjectListPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-add-subject"
            element={
              <AuthorizeAdmin>
                <AddSubjectPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-edit-subject"
            element={
              <AuthorizeAdmin>
                <EditSubjectPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-plans"
            element={
              <AuthorizeAdmin>
                <ManagePlansPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-add-plans"
            element={
              <AuthorizeAdmin>
                <AddPlanPage />
              </AuthorizeAdmin>
            }
          />
          <Route
            path="/admin-edit-plans"
            element={
              <AuthorizeAdmin>
                <EditPlansPage />
              </AuthorizeAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
