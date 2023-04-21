import './App.css'
import { BrowserRouter, Route, Routes , Navigate } from 'react-router-dom'
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
import AddEvents from './components/Student/Events/AddEvents'
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
import StudentChatPage from './pages/student/StudentChatPage'
 
 
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
            element={<HomePage />}
          />
          <Route
            path="/signin"
            // element={ student.token === '' ? <StudentLoginPage /> : <Navigate to='/' /> }
            element={<StudentLoginPage />}
          />
          <Route
            path="/signup"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={<StudentSignUpPage />}
          />
          <Route
            path="/otp"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={<OtpPageStudent />}
          />
          <Route
            path="/upload-notes"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={<UploadNotesPage />}
          />
          <Route
            path="/upload-videos"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={<UploadVideosPage />}
          />
          <Route
            path="/upload-question-paper"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={<UploadQuestionPapersPage />}
          />
          <Route
            path="/events"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={<EventsPage />}
          />
          <Route
            path="/add-events"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={<AddEvents />}
          />
          <Route
            path="/plans"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={<PlansPage />}
          />
          <Route
            path="/chats"
            //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />}
            element={<StudentChatPage />}
          />
          <Route path="/my-uploads" element={<MyUploadsPage />} />
          <Route path="/tutors" element={<TutorsList />} />
          <Route path="/tutor-signin" element={<TutorLoginPage />} />
          <Route path="/tutor-otp" element={<OtpPageTutor />} />
          <Route path="/tutor-signup" element={<TutorSignUpPage />} />
          <Route path="/tutor-dashboard" element={<TutorDashboardPage />} />
          <Route path="/tutor-uploads" element={<UploadsPage />} />
          <Route
            path="/tutor-edit-profile"
            element={<TutorEditProfilePage />}
          />
          <Route
            path="/tutor-upload-notes"
            element={<TutorUploadNotesPage />}
          />
          <Route
            path="/tutor-upload-questions"
            element={<TutorUploadQuestionsPage />}
          />
          <Route
            path="/tutor-upload-videos"
            element={<TutorUploadVideosPage />}
          />
          <Route path="/tutor-add-events" element={<TutorAddEventsPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-notes" element={<MangageNotesPage />} />
          <Route
            path="/admin-question-papers"
            element={<ManageQuestionPapersPage />}
          />
          <Route path="/admin-events" element={<ManageEventsPage />} />
          <Route path="/admin-edit-videos" element={<EditVideosPage />} />
          <Route path="/admin-edit-notes" element={<EditNotesPage />} />
          <Route
            path="/admin-edit-question-papers"
            element={<EditQuestionPaperPage />}
          />
          <Route path="/admin-edit-events" element={<EditEventsPage />} />
          <Route path="/admin-videos" element={<ManageVideosPage />} />
          <Route path="/admin-board" element={<BoardListPage />} />
          <Route path="/admin-students" element={<StudentsListPage />} />
          <Route path="/admin-tutors" element={<TutorsListPage />} />
          <Route path="/admin-add-board" element={<AddBoardPage />} />
          <Route path="/admin-branch" element={<BranchListPage />} />
          <Route path="/admin-add-branch" element={<AddBranchPage />} />
          <Route path="/admin-subject" element={<SubjectListPage />} />
          <Route path="/admin-add-subject" element={<AddSubjectPage />} />
          <Route path="/admin-plans" element={<ManagePlansPage />} />
          <Route path="/admin-add-plans" element={<AddPlanPage />} />
          <Route path="/admin-edit-plans" element={<EditPlansPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
